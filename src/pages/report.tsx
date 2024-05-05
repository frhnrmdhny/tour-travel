import { useState } from 'react'
import { type DateRange } from 'react-day-picker'
import DateRangePicker from '~/components/DateRangePicker'
import Layout from '~/components/Layout'
import EmployeeReport from '~/sections/report-section/EmployeeReport'
import PartnerReport from '~/sections/report-section/PartnerReport'
import PurchaseOrderReport from '~/sections/report-section/PurchaseOrderReport'

const TAB_DATA = [
  {
    id: 0,
    label: 'Summary'
  },
  {
    id: 1,
    label: 'Purchase Order'
  },
  {
    id: 2,
    label: 'Mitra'
  },
  {
    id: 3,
    label: 'Karyawan'
  }
]

export default function Report() {
  const [active, setActive] = useState(1)
  const [range, setRange] = useState<undefined | DateRange>(undefined)

  return (
    <Layout>
      <div className="mb-2">
        <h1 className="font-bold text-gray-800">Report</h1>
        <h3 className="text-sm text-slate-500">Semua data laporan</h3>
      </div>

      <DateRangePicker onChange={setRange} />

      <div className="max-w-sm">
        <div role="tablist" className="tabs tabs-lifted">
          {TAB_DATA.map((item) => (
            <a
              role="tab"
              className={`tab ${item.id === active ? 'tab-active' : ''}`}
              onClick={() => setActive(item.id)}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {active === 1 ? (
        <PurchaseOrderReport range={range} />
      ) : active === 2 ? (
        <PartnerReport range={range} />
      ) : active === 3 ? (
        <EmployeeReport range={range} />
      ) : null}
    </Layout>
  )
}
