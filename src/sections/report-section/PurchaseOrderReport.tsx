import { useMemo } from 'react'
import { type DateRange } from 'react-day-picker'
import { api } from '~/utils/api'
import { format } from 'date-fns'

interface Props {
  range: DateRange | undefined
}

export default function PurchaseOrderReport({ range }: Props) {
  const { data } = api.purchaseOrder.report.useQuery({
    from: range?.from,
    to: range?.to
  })

  const groupedPurchaseOrders = useMemo(
    () =>
      data
        ? Object.groupBy(data.purchaseOrders, (item) =>
            format(item.createdAt, 'PPPP')
          )
        : {},
    [data]
  )

  return (
    <div className="mt-4">
      <div className="stats border border-base-300">
        <div className="stat">
          <div className="stat-title">Jumlah Pengeluaran</div>
          <div className="stat-value">
            IDR {data?.totalExpenses.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="join join-vertical w-full mt-4">
        {Object.entries(groupedPurchaseOrders).map(([key, value]) => (
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              <p>{key} (Dibuat)</p>
              <p className="text-sm">{value?.length} Purchase Orders</p>
            </div>
            <div className="collapse-content flex flex-col gap-2">
              {value?.map((item) => (
                <div
                  key={item.id}
                  className="border border-base-300 rounded p-2"
                >
                  <div className="flex justify-between">
                    <p>{item.name}</p>
                    <p>
                      {item.completedDate
                        ? format(item.completedDate, 'PPPPpp')
                        : null}{' '}
                      (Selesai)
                    </p>
                  </div>
                  <p>Total : IDR {item.total.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
