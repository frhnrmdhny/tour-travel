import Layout from '~/components/Layout'
import usePagination from '~/hooks/usePagination'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { type Prisma } from '@prisma/client'

import type { RouterOutput } from '~/server/api/root'
import Toolbar from '~/components/Toolbar/Toolbar'

type ProductGetOutput = RouterOutput['product']['get']

export default function Product() {
  const router = useRouter()

  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination<
    Prisma.ProductWhereInput,
    Prisma.ProductOrderByWithRelationInput
  >()

  const { data, isLoading } = api.product.get.useQuery(
    {
      ...paginationModel
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
          <h3 className="text-sm text-slate-500">Daftar paket / produk</h3>
        </div>

        <Toolbar
          onChange={(value) => {
            setPaginationModel((c) => ({
              ...c,
              where: {
                OR: [
                  {
                    name: {
                      contains: value,
                      mode: 'insensitive'
                    }
                  },
                  {
                    description: {
                      contains: value,
                      mode: 'insensitive'
                    }
                  }
                ]
              }
            }))
          }}
          handleAdd={() => void router.push('/product/create')}
        />

        <DataGrid
          rows={data?.products ?? []}
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
          sortingMode="server"
          onSortModelChange={(model) =>
            setPaginationModel((c) => ({
              ...c,
              orderBy: model.map((value) => ({
                [value.field]: value.sort
              })) as Prisma.DepartureOrderByWithRelationInput
            }))
          }
          disableColumnFilter
        />
      </>
    </Layout>
  )
}
