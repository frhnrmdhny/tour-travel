import Layout from '~/components/Layout'
import useVerifySuperAdmin from '~/hooks/useVerifySuperAdmin'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { type User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import usePagination from '~/hooks/usePagination'

export default function User() {
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { isSuperAdmin } = useVerifySuperAdmin()

  const { data, isLoading } = api.user.getUsers.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
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
                      onSuccess: () => void utils.user.getUsers.invalidate()
                    }
                  )
                }
              >
                {isVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
              </button>
            )
          }
        }
      ] satisfies GridColDef<User>[],
    [mutate, session?.user.id, utils.user.getUsers]
  )

  return (
    <Layout>
      <DataGrid
        rows={data?.users ?? []}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        rowCount={data?.pagination.rowCount ?? 0}
        rowSelection={false}
      />
    </Layout>
  )
}
