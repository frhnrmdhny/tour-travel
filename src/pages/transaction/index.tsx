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
          field: 'action',
          headerName: 'Action',
          flex: 1
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
          <h1 className="font-bold text-gray-800">Transaction</h1>
          <h3 className="text-sm text-slate-500">Pages  / Transaction</h3>
        </div>
        <div className="mb-2 flex gap-2 justify-between">
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            <input type="text" className="grow" placeholder="Cari product ..." />
          </label>
          <div className="mb-2">
            <button
              onClick={() => void router.push('/transaction/create')}
              className="btn bg-[#01B9DE] hover:bg-sky-400 text-white btn-md rounded-full"
            >
              + Tambah Transaction
            </button>
          </div>
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
