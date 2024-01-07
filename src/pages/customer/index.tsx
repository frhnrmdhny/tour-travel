import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import { type Customer } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Customer() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5
  })

  const { data, isLoading, refetch } = api.customer.getCustomers.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.customer.deleteCustomer.useMutation()

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phoneNumber', headerName: 'No Telepon', flex: 1 },
        { field: 'address', headerName: 'Alamat', flex: 1 },
        { field: 'age', headerName: 'Umur', flex: 1 },
        {
          field: 'gender',
          headerName: 'Jenis Kelamin',
          flex: 1,
          valueGetter: (params) =>
            params.row.gender === 'MALE' ? 'Laki-laki' : 'Perempuan'
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
                        onSuccess: () => void refetch()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/customer/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] as GridColDef<Customer>[],
    [mutate, refetch, router]
  )

  return (
    <Layout>
      <>
        <div className="mb-2">
          <button
            onClick={() => void router.push('/customer/create')}
            className="btn btn-primary btn-sm"
          >
            Tambahkan
          </button>
        </div>

        <DataGrid
          rows={data?.customers ?? []}
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
