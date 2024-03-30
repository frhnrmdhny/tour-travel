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
    { enabled: !!session?.user },
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
          <button
            onClick={() => void router.push('/product/create')}
            className="btn btn-primary btn-sm"
          >
            Tambahkan
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
