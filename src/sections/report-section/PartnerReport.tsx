import { format } from 'date-fns'
import { useMemo } from 'react'
import { type DateRange } from 'react-day-picker'
import { api } from '~/utils/api'

interface Props {
  range: DateRange | undefined
}

export default function PartnerReport({ range }: Props) {
  const { data } = api.partner.report.useQuery({
    from: range?.from,
    to: range?.to
  })

  const groupedPartnerBalanceHistories = useMemo(
    () =>
      data
        ? Object.groupBy(data.partnerBalanceHistories, (item) => item.partnerId)
        : {},
    [data]
  )

  return (
    <div className="mt-4">
      <div className="stats border border-base-300">
        <div className="stat">
          <div className="stat-title">Jumlah Pengeluaran</div>
          <div className="stat-value">
            IDR {Math.abs(data?.totalExpenses ?? 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="join join-vertical w-full mt-4">
        {Object.entries(groupedPartnerBalanceHistories).map(([_, value]) => (
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              <p>
                {value?.[0]?.partner.name} - {value?.[0]?.partner.email}
              </p>
              <p className="text-sm">{value?.length} Purchase Orders</p>
            </div>
            <div className="collapse-content flex flex-col gap-2">
              {value?.map((item) => (
                <div
                  key={item.id}
                  className="border border-base-300 rounded p-2"
                >
                  <div className="flex justify-between">
                    <p>{item.description}</p>
                    <p>{format(item.createdAt, 'PPPPpp')}</p>
                  </div>
                  <p>Total : IDR {Math.abs(item.amount).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
