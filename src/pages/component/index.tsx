import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { type Prisma } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import Layout from '~/components/Layout'
import Toolbar from '~/components/Toolbar/Toolbar'
import usePagination from '~/hooks/usePagination'
import { type RouterOutput } from '~/server/api/root'
import { api } from '~/utils/api'

type ComponentGetOutput = RouterOutput['component']['get']

export default function Component() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination<
    Prisma.ComponentWhereInput,
    Prisma.ComponentOrderByWithRelationInput
  >()

  const { data, isLoading } = api.component.get.useQuery(
    {
      ...paginationModel
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.component.delete.useMutation()

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
                        onSuccess: () => void utils.component.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/component/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<ComponentGetOutput['components'][0]>[],
    [mutate, router, utils.component.get]
  )

  return (
    <Layout>
      <>
        <div className="mb-2">
          <h1 className="font-bold text-gray-800">Component</h1>
          <h3 className="text-sm text-slate-500">Daftar data barang</h3>
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
          handleAdd={() => void router.push('/component/create')}
        />

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
