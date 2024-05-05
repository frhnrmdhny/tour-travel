import Layout from '~/components/Layout'
import usePagination from '~/hooks/usePagination'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import type { RouterOutput } from '~/server/api/root'
import { type Prisma } from '@prisma/client'
import Toolbar from '~/components/Toolbar/Toolbar'

type PartnerGetOutput = RouterOutput['partner']['get']

export default function Partner() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination<
    Prisma.PartnerWhereInput,
    Prisma.PartnerOrderByWithRelationInput
  >()

  const { data, isLoading } = api.partner.get.useQuery(
    {
      ...paginationModel
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
                        onSuccess: () => void utils.partner.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/partner/${id}/edit`)}
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
      <div className="mb-2">
        <h1 className="font-bold text-gray-800">Mitra</h1>
        <h3 className="text-sm text-slate-500">Daftar data mitra</h3>
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
                  email: {
                    contains: value,
                    mode: 'insensitive'
                  }
                }
              ]
            }
          }))
        }}
        handleAdd={() => void router.push('/partner/create')}
      />

      <DataGrid
        rows={data?.partners ?? []}
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
    </Layout>
  )
}
