import { type RefObject, useMemo, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import usePagination from '~/hooks/usePagination'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { type RouterOutput } from '~/server/api/root'
import { useRouter } from 'next/router'

type ComponentGetOutput = RouterOutput['component']['get']

interface Props {
  manageComponentDialogRef: RefObject<HTMLDialogElement>
}

export default function ManageComponentDialog({
  manageComponentDialogRef
}: Props) {
  const router = useRouter()

  const productId = router.query.id as string

  useEffect(() => {
    if (!productId) void router.push('/product')
  }, [productId, router])

  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { data, isLoading } = api.component.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const utils = api.useUtils()

  const { mutate } = api.productComponent.addProductComponent.useMutation()

  const { data: productComponents } =
    api.productComponent.getByProductId.useQuery(
      {
        productId
      },
      { enabled: !!session?.user }
    )

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        { field: 'price', headerName: 'Harga', flex: 1 },
        {
          field: 'stock',
          headerName: 'Stock',
          flex: 1
        },
        {
          field: 'id',
          headerName: '',
          flex: 1,
          renderCell: (params) => {
            const { id: componentId } = params.row

            return (
              <span className="flex flex-row gap-2">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    mutate(
                      {
                        componentId,
                        productId
                      },
                      {
                        onSuccess: () =>
                          void utils.productComponent.getByProductId.invalidate(
                            { productId }
                          )
                      }
                    )
                  }}
                >
                  Add
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<ComponentGetOutput['components'][0]>[],
    [mutate, productId, utils.productComponent.getByProductId]
  )

  return (
    <dialog className="modal" ref={manageComponentDialogRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Manage Component</h3>

        <DataGrid
          rows={data?.components ?? []}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          rowCount={data?.pagination.rowCount ?? 0}
          rowSelection={false}
        />

        {productComponents && (
          <div className="flex flex-col gap-2 mt-2">
            {productComponents.map((item) => (
              <div
                className="card shadow-md px-4 py-2 flex flex-row justify-between items-center"
                key={`${item.productId}_${item.componentId}}`}
              >
                <p>{item.component.name}</p>

                <div className="flex gap-2">
                  <button className="btn btn-circle btn-sm">-</button>
                  <input
                    type="number"
                    className="input input-bordered input-sm w-[100px]"
                    value={item.quantity}
                  />
                  <button className="btn btn-circle btn-sm">+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn btn-sm btn-warning">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
