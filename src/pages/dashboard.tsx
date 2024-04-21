import Layout from '~/components/Layout'
import { api } from '~/utils/api'

export default function Dashboard() {
  const { data } = api.customer.getDashboardData.useQuery()

  return (
    <Layout>
      <div className="stats border border-base-300">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Pelanggan Baru</div>
          <div className="stat-value">{data?.thisMonthCustomerCount}</div>
          <div className="stat-desc">
            ↗︎ (
            {data?.customerGrowth && isFinite(data.customerGrowth)
              ? data.customerGrowth
              : 0}
            %) bulan ini
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Jumlah Pelanggan</div>
          <div className="stat-value">{data?.customerCount}</div>
          <div className="stat-desc"># semua pelanggan </div>
        </div>
      </div>
    </Layout>
  )
}
