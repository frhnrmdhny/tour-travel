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

type PurchaseOrderGetOutput = RouterOutput['purchaseOrder']['get']

export default function PurchaseOrder() {
  const router = useRouter()

  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination<
    Prisma.PurchaseOrderWhereInput,
    Prisma.PurchaseOrderOrderByWithRelationInput
  >()

  const { data, isLoading } = api.purchaseOrder.get.useQuery(
    {
      ...paginationModel
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.purchaseOrder.delete.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        { field: 'total', headerName: 'Total', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'completedDate', headerName: 'Tanggal Selesai', flex: 1 },
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
                        onSuccess: () =>
                          void utils.purchaseOrder.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/purchase-order/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<PurchaseOrderGetOutput['purchaseOrders'][0]>[],
    [mutate, router, utils.purchaseOrder.get]
  )

  return (
    <Layout>
      <div className="mb-2">
        <h1 className="font-bold text-gray-800">Purchase Order</h1>
        <h3 className="text-sm text-slate-500">Daftar pembelian</h3>
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
                }
              ]
            }
          }))
        }}
        handleAdd={() => void router.push('/purchase-order/create')}
      />

      <DataGrid
        rows={data?.purchaseOrders ?? []}
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
