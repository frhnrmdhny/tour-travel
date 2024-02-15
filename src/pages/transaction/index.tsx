import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import usePagination from '~/hooks/usePagination'
import { type RouterOutput } from '~/server/api/root'

type TransactionGetOutput = RouterOutput['transaction']['get']

export default function Transaction() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { data, isLoading } = api.transaction.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.transaction.delete.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        {
          field: 'status',
          headerName: 'Status',
          flex: 1
        },
        {
          field: 'customer',
          headerName: 'Customer Name',
          flex: 1,
          valueGetter: (params) => {
            const { customer } = params.row
            return customer.namePassport
          }
        },
        {
          field: 'departure',
          headerName: 'Departure Name',
          flex: 1,
          valueGetter: (params) => {
            const { departure } = params.row
            return departure.name
          }
        },
        {
          field: 'product',
          headerName: 'Product Name',
          flex: 1,
          valueGetter: (params) => {
            const { product } = params.row
            return product.name
          }
        },
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
                        onSuccess: () => void utils.transaction.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/transaction/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<TransactionGetOutput['transactions'][0]>[],
    [mutate, router, utils.transaction.get]
  )

  return (
    <Layout>
      <>
        <div className="mb-2">
          <button
            onClick={() => void router.push('/transaction/create')}
            className="btn btn-primary btn-sm"
          >
            Tambahkan
          </button>
        </div>

        <DataGrid
          rows={data?.transactions ?? []}
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
