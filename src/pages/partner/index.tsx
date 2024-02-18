import Layout from '~/components/Layout'
import usePagination from '~/hooks/usePagination'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import type { RouterOutput } from '~/server/api/root'

type PartnerGetOutput = RouterOutput['partner']['get']

export default function Partner() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { data, isLoading } = api.partner.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.partner.delete.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1
        },
        { field: 'address', headerName: 'Alamat', flex: 1 },
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
                        onSuccess: () => void utils.partner.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/Partner/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<PartnerGetOutput['partners'][0]>[],
    [mutate, router, utils.partner.get]
  )

  return (
    <Layout>
      <>
        <div className="mb-2">
          <button
            onClick={() => void router.push('/partner/create')}
            className="btn btn-primary btn-sm"
          >
            Tambahkan
          </button>
        </div>

        <DataGrid
          rows={data?.partners ?? []}
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
