import Layout from '~/components/Layout'
import useVerifySuperAdmin from '~/hooks/useVerifySuperAdmin'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import usePagination from '~/hooks/usePagination'
import { type RouterOutput } from '~/server/api/root'
import Toolbar from '~/components/Toolbar/Toolbar'
import { type Prisma } from '@prisma/client'

type UserGetOutput = RouterOutput['user']['get']

export default function User() {
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination<
    Prisma.UserWhereInput,
    Prisma.UserOrderByWithRelationInput
  >()

  const { isSuperAdmin } = useVerifySuperAdmin()

  const { data, isLoading } = api.user.get.useQuery(
    {
      ...paginationModel
    },
    { enabled: isSuperAdmin }
  )

  const { mutate } = api.user.toggleVerification.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
          field: 'role',
          headerName: 'Status Verifikasi',
          flex: 1,
          renderCell: (params) => {
            const { role } = params.row

            if (session?.user.id === params.row.id) return <>Super Admin</>

            const isVerified = role === 'ADMIN' || role === 'SUPERADMIN'

            return (
              <button
                className={`btn btn-sm ${
                  isVerified ? 'btn-success' : 'btn-warning'
                }`}
                onClick={() =>
                  mutate(
                    {
                      idUser: params.row.id
                    },
                    {
                      onSuccess: () => void utils.user.get.invalidate()
                    }
                  )
                }
              >
                {isVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
              </button>
            )
          }
        }
      ] satisfies GridColDef<UserGetOutput['users'][0]>[],
    [mutate, session?.user.id, utils.user.get]
  )

  return (
    <Layout>
      <div className="mb-2">
        <h1 className="font-bold text-gray-800">User</h1>
        <h3 className="text-sm text-slate-500">Daftar semua pengguna</h3>
      </div>

      <div className="mb-2 flex gap-2 justify-between">
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
                    email: {
                      contains: value,
                      mode: 'insensitive'
                    }
                  }
                ]
              }
            }))
          }}
        />
      </div>

      <DataGrid
        rows={data?.users ?? []}
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
            })) as Prisma.UserOrderByWithRelationInput
          }))
        }
        disableColumnFilter
      />
    </Layout>
  )
}
