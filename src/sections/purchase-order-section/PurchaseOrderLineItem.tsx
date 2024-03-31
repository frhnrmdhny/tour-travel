import usePagination from '~/hooks/usePagination'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { type RouterOutput } from '~/server/api/root'
import { useMemo, useRef } from 'react'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import AddLineItemDialog from './AddLineItemDialog'
import InlineInput from '~/components/InlineInput'

type LineItemGetByPurchaseOrderOutput =
  RouterOutput['lineItem']['getByPurchaseOrder']

export default function PurchaseOrderLineItem() {
  const router = useRouter()
  const purchaseOrderId = router.query.id as string
  const addLineItemDialogRef = useRef<HTMLDialogElement>(null)

  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()

  const { data, isLoading } = api.lineItem.getByPurchaseOrder.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      purchaseOrderId
    },
    { enabled: !!purchaseOrderId && !!session?.user }
  )

  const { data: purchaseOrder } = api.purchaseOrder.getById.useQuery(
    {
      id: purchaseOrderId
    },
    { enabled: !!purchaseOrderId && !!session?.user }
  )

  const isLocked = useMemo(
    () => purchaseOrder?.status !== 'NEW',
    [purchaseOrder?.status]
  )

  const { mutate } = api.lineItem.delete.useMutation()

  const { mutate: updateLineItem } = api.lineItem.update.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        {
          field: 'name',
          headerName: 'Nama',
          flex: 1,
          valueGetter: (params) => {
            const {
              Component: { name }
            } = params.row
            return name
          }
        },
        {
          field: 'quantity',
          headerName: 'Quantity',
          flex: 1,
          renderCell: (params) => {
            const { id, quantity } = params.row

            return (
              <InlineInput
                initialValue={quantity}
                onChange={(value) => {
                  updateLineItem(
                    {
                      id,
                      quantity: value
                    },
                    {
                      onSuccess: () => {
                        void utils.lineItem.getByPurchaseOrder.invalidate()
                        void utils.purchaseOrder.getById.invalidate({
                          id: purchaseOrderId
                        })
                      }
                    }
                  )
                }}
              />
            )
          }
        },
        {
          field: 'price',
          headerName: 'Price',
          flex: 1,
          renderCell: (params) => {
            const { id, price } = params.row

            return (
              <InlineInput
                initialValue={price}
                onChange={(value) => {
                  updateLineItem(
                    {
                      id,
                      price: value
                    },
                    {
                      onSuccess: () => {
                        void utils.lineItem.getByPurchaseOrder.invalidate()
                        void utils.purchaseOrder.getById.invalidate({
                          id: purchaseOrderId
                        })
                      }
                    }
                  )
                }}
              />
            )
          }
        },
        { field: 'total', headerName: 'Total', flex: 1 },
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
                  disabled={isLocked}
                  onClick={() =>
                    mutate(
                      {
                        id
                      },
                      {
                        onSuccess: () => {
                          void utils.lineItem.getByPurchaseOrder.invalidate()
                          void utils.purchaseOrder.getById.invalidate({
                            id: purchaseOrderId
                          })
                        }
                      }
                    )
                  }
                >
                  Hapus
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<
        LineItemGetByPurchaseOrderOutput['lineItems'][0]
      >[],
    [
      isLocked,
      mutate,
      purchaseOrderId,
      updateLineItem,
      utils.lineItem.getByPurchaseOrder,
      utils.purchaseOrder.getById
    ]
  )

  return (
    <div className="col-span-8">
      <div className="mb-2">
        <button
          onClick={() => void addLineItemDialogRef.current?.showModal()}
          className="btn btn-primary btn-sm"
          disabled={isLocked}
        >
          Tambahkan
        </button>
      </div>

      <AddLineItemDialog addLineItemDialogRef={addLineItemDialogRef} />

      <DataGrid
        rows={data?.lineItems ?? []}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        rowCount={data?.pagination.rowCount ?? 0}
        rowSelection={false}
      />
    </div>
  )
}
