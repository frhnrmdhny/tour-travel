import Layout from '~/components/Layout'
import usePagination from '~/hooks/usePagination'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import type { RouterOutput } from '~/server/api/root'

type ProductGetOutput = RouterOutput['product']['get']

export default function Product() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { data, isLoading } = api.product.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.product.delete.useMutation()

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
          field: 'category',
          headerName: 'Category',
          flex: 1,
          valueGetter: (params) => {
            const { row } = params
            return row.productCategory.name
          }
        },
        { field: 'action', headerName: 'Action', flex: 1 },
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
                        onSuccess: () => void utils.product.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/product/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<ProductGetOutput['products'][0]>[],
    [mutate, router, utils.product.get]
  )

  return (
    <Layout>
      <>
        <div className="mb-2">
          <h1 className="font-bold text-gray-800">Product</h1>
          <h3 className="text-sm text-slate-500">Pages / Product</h3>
        </div>
        <div className="mb-2 flex gap-2 justify-between">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Cari product ..."
            />
          </label>

          <button
            onClick={() => void router.push('/product/create')}
            className="btn bg-[#01B9DE] hover:bg-sky-400 text-white btn-md rounded-full"
          >
            + Tambahkan Product
          </button>
        </div>

        <DataGrid
          rows={data?.products ?? []}
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
