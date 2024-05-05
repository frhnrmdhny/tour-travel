import { useMemo } from 'react'
import { type DateRange } from 'react-day-picker'
import { api } from '~/utils/api'
import { format } from 'date-fns'

interface Props {
  range: DateRange | undefined
}

export default function EmployeeReport({ range }: Props) {
  const { data } = api.employee.report.useQuery({
    from: range?.from,
    to: range?.to
  })

  const groupedPaySlips = useMemo(
    () =>
      data ? Object.groupBy(data.paySlips, (item) => item.employeeId) : {},
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
        {Object.entries(groupedPaySlips).map(([key, value]) => (
          <div
            className="collapse collapse-arrow join-item border border-base-300"
            key={key}
          >
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              <p>
                {value?.[0]?.Employee.name} - {value?.[0]?.Employee.email}
              </p>
              <p className="text-sm">{value?.length} Payslips</p>
            </div>
            <div className="collapse-content flex flex-col gap-2">
              {value?.map((item) => (
                <div
                  key={item.id}
                  className="border border-base-300 rounded p-2"
                >
                  <div className="flex justify-between">
                    <div>
                      <p>Gross : IDR {item.grossPay.toLocaleString()}</p>
                      <p>Deductions : IDR {item.deductions.toLocaleString()}</p>
                      <p>Net : IDR {item.netPay.toLocaleString()}</p>
                    </div>
                    <p>
                      {item.createdAt ? format(item.createdAt, 'PPPPpp') : null}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
