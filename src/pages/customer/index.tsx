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
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'age', headerName: 'Age', flex: 1 },
        { field: 'gender', headerName: 'Gender', flex: 1 },
        {
          field: 'id',
          headerName: 'Action',
          flex: 1,
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
                  Delete
                </button>

                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => router.push(`/customer/${id}/edit`)}
                >
                  Edit
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<Customer>[],
    [mutate, refetch, router]
  )

  return (
    <Layout>
      <>
        <div className="mb-2">
          <button
            onClick={() => void router.push('/customer/create')}
            className="btn btn-primary"
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
