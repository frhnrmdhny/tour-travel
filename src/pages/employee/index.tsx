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

type EmployeeGetOutput = RouterOutput['employee']['get']

export default function Employee() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination<
    Prisma.EmployeeWhereInput,
    Prisma.EmployeeOrderByWithRelationInput
  >()

  const { data, isLoading } = api.employee.get.useQuery(
    {
      ...paginationModel
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.employee.delete.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        {
          field: 'title',
          headerName: 'Title',
          flex: 1
        },
        { field: 'email', headerName: 'Email', flex: 1 },
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
                        onSuccess: () => void utils.employee.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/employee/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<EmployeeGetOutput['employees'][0]>[],
    [mutate, router, utils.employee.get]
  )

  return (
    <Layout>
      <div className="mb-2">
        <h1 className="font-bold text-gray-800">Karyawan</h1>
        <h3 className="text-sm text-slate-500">Daftar data karyawan</h3>
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
                  },
                  title: {
                    contains: value,
                    mode: 'insensitive'
                  },
                  email: {
                    contains: value,
                    mode: 'insensitive'
                  }
                }
              ]
            }
          }))
        }}
        handleAdd={() => void router.push('/employee/create')}
      />

      <DataGrid
        rows={data?.employees ?? []}
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
    </Layout>
  )
}
