import { useState } from 'react'
import { type DateRange } from 'react-day-picker'
import DateRangePicker from '~/components/DateRangePicker'
import Layout from '~/components/Layout'
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
  }
]

export default function Report() {
  const [active, setActive] = useState(1)
  const [range, setRange] = useState<undefined | DateRange>(undefined)

  return (
    <Layout>
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

      {active === 1 ? <PurchaseOrderReport range={range} /> : null}
    </Layout>
  )
}
