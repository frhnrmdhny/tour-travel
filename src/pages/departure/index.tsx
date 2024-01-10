import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { type Departure } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import Layout from '~/components/Layout'
import usePagination from '~/hooks/usePagination'
import { api } from '~/utils/api'

export default function Dashboard() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { data, isLoading, refetch } = api.departure.getDepartures.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.departure.deleteDeparture.useMutation()

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama Keberangkatan', flex: 1 },
        {
          field: 'departureDate',
          headerName: 'Tanggal Keberangkatan',
          flex: 1
        },
        { field: 'returnDate', headerName: 'Tanggal Kembali', flex: 1 },
        {
          field: 'status',
          headerName: 'Status',
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
                        onSuccess: () => void refetch()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/departure/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<Departure>[],
    [mutate, refetch, router]
  )

  return (
    <Layout>
      <>
        <div className="mb-2">
          <button
            onClick={() => void router.push('/departure/create')}
            className="btn btn-primary btn-sm"
          >
            Tambahkan
          </button>
        </div>

        <DataGrid
          rows={data?.departures ?? []}
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
