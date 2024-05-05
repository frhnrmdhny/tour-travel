import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import usePagination from '~/hooks/usePagination'
import { type RouterOutput } from '~/server/api/root'
import Toolbar from '~/components/Toolbar/Toolbar'
import { type Prisma } from '@prisma/client'
import { createXls } from '~/utils/xls'

type CustomerGetOutput = RouterOutput['customer']['get']

export default function Customer() {
  const router = useRouter()

  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination<
    Prisma.CustomerWhereInput,
    Prisma.CustomerOrderByWithRelationInput
  >()

  const { data, isLoading } = api.customer.get.useQuery(
    {
      ...paginationModel
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.customer.delete.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        {
          field: 'title',
          headerName: 'Title',
          flex: 1
        },
        { field: 'namePassport', headerName: 'Nama', flex: 1 },
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
                        onSuccess: () => void utils.customer.get.invalidate()
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
      ] satisfies GridColDef<CustomerGetOutput['customers'][0]>[],
    [mutate, router, utils.customer.get]
  )

  return (
    <Layout>
      <div className="mb-2">
        <h1 className="font-bold text-gray-800">Customer</h1>
        <h3 className="text-sm text-slate-500">Daftar semua pelanggan</h3>
      </div>
      <div className="mb-2 flex gap-2 justify-between">
        <Toolbar
          handleAdd={() => void router.push('/customer/create')}
          onChange={(value) => {
            setPaginationModel((c) => ({
              ...c,
              where: {
                OR: [
                  {
                    namePassport: {
                      contains: value,
                      mode: 'insensitive'
                    }
                  },
                  {
                    address: {
                      contains: value,
                      mode: 'insensitive'
                    }
                  }
                ]
              }
            }))
          }}
        >
          {data && (
            <button
              onClick={() => createXls(data)}
              className="btn bg-[#01B9DE] hover:bg-sky-600 btn-md rounded-full text-white"
            >
              Unduh XLSM
            </button>
          )}
        </Toolbar>
      </div>

      <DataGrid
        rows={data?.customers ?? []}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={{
          page: paginationModel.page,
          pageSize: paginationModel.pageSize
        }}
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
            })) as Prisma.CustomerOrderByWithRelationInput
          }))
        }
        disableColumnFilter
      />
    </Layout>
  )
}
