import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import Layout from '~/components/Layout'
import usePagination from '~/hooks/usePagination'
import { type RouterOutput } from '~/server/api/root'
import { api } from '~/utils/api'

type PurchaseOrderGetOutput = RouterOutput['purchaseOrder']['get']

export default function PurchaseOrder() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { data, isLoading } = api.purchaseOrder.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.purchaseOrder.delete.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        { field: 'total', headerName: 'Total', flex: 1 },
        {
          field: 'id',
          headerName: '',
          width: 200,
          renderCell: (params) => {
            const { id } = params.row

            return (
              <span className="flex flex-row gap-2">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() =>
                    mutate(
                      {
                        id
                      },
                      {
                        onSuccess: () =>
                          void utils.purchaseOrder.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/purchase-order/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<PurchaseOrderGetOutput['purchaseOrders'][0]>[],
    [mutate, router, utils.purchaseOrder.get]
  )

  return (
    <Layout>
      <>
        <div className="mb-2">
          <button
            onClick={() => void router.push('/purchase-order/create')}
            className="btn btn-primary btn-sm"
          >
            Tambahkan
          </button>
        </div>

        <DataGrid
          rows={data?.purchaseOrders ?? []}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          rowCount={data?.pagination.rowCount ?? 0}
          rowSelection={false}
        />
      </>
    </Layout>
  )
}
