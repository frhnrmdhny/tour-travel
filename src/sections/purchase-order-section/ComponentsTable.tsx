import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import usePagination from '~/hooks/usePagination'
import { type RouterOutput } from '~/server/api/root'
import { api } from '~/utils/api'

type ComponentGetOutput = RouterOutput['component']['get']

export default function ComponentsTable() {
  const router = useRouter()
  const purchaseOrderId = router.query.id as string

  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { data, isLoading } = api.component.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.lineItem.add.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        {
          field: 'description',
          headerName: 'Deskripsi',
          flex: 1
        },
        { field: 'price', headerName: 'Harga', flex: 1 },
        {
          field: 'stock',
          headerName: 'Stock',
          flex: 1
        },
        {
          field: 'restockLevel',
          headerName: 'Restock Level',
          flex: 1
        },
        {
          field: 'id',
          headerName: '',
          width: 200,
          renderCell: (params) => {
            const { id, price } = params.row

            return (
              <span className="flex flex-row gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    void mutate(
                      {
                        ComponentId: id,
                        price,
                        purchaseOrderId,
                        quantity: 1,
                        total: price * 1
                      },
                      {
                        onSuccess: () => {
                          void utils.lineItem.getByPurchaseOrder.invalidate()
                          void utils.purchaseOrder.getById.invalidate({
                            id: purchaseOrderId
                          })
                        }
                      }
                    )
                  }
                >
                  Tambahkan
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<ComponentGetOutput['components'][0]>[],
    [
      mutate,
      purchaseOrderId,
      utils.lineItem.getByPurchaseOrder,
      utils.purchaseOrder.getById
    ]
  )

  return (
    <DataGrid
      rows={data?.components ?? []}
      columns={columns}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={(model) =>
        setPaginationModel((c) => ({ ...c, ...model }))
      }
      rowCount={data?.pagination.rowCount ?? 0}
      rowSelection={false}
    />
  )
}
