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
        <div className="stats shadow-md flex justify-center">
          <div className="stat">
            <div className="stat-title text-xl text-black font-bold p-2">
              Pelanggan Tour & Travel
            </div>
            <div className="justify-start items-center gap-5 inline-flex">
              <div className="stats shadow bg-[#01B9DE]">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <div className="w-14 h-14 px-3 py-3  rounded-full bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.42414 7.02985C2.95994 6.8959 3.50287 7.22166 3.63682 7.75746L4.14611 9.79461C4.9592 13.047 7.52144 15.5686 10.7794 16.3333H21.3333C24.1214 16.3333 26.4681 18.4201 26.7939 21.1891L27.6598 28.5498C27.7243 29.0983 27.332 29.5953 26.7835 29.6598C26.235 29.7243 25.738 29.332 25.6735 28.7835L24.8076 21.4228C24.6003 19.661 23.1072 18.3333 21.3333 18.3333H10.5569L10.4497 18.3095C6.4028 17.4102 3.2113 14.3016 2.20583 10.2797L1.69654 8.24253C1.56259 7.70673 1.88835 7.1638 2.42414 7.02985Z"
                          fill="url(#paint0_linear_3229_2569)"
                        />
                        <path
                          opacity="0.5"
                          d="M10.6667 18.3334V24C10.6667 26.5142 10.6667 27.7713 11.4477 28.5523C12.2288 29.3334 13.4859 29.3334 16 29.3334C18.5142 29.3334 19.7713 29.3334 20.5523 28.5523C21.3334 27.7713 21.3334 26.5142 21.3334 24V18.3334H10.6667Z"
                          fill="url(#paint1_linear_3229_2569)"
                        />
                        <circle
                          cx="16"
                          cy="8.00002"
                          r="5.33333"
                          fill="url(#paint2_linear_3229_2569)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3229_2569"
                            x1="14.6666"
                            y1="6.99976"
                            x2="14.6666"
                            y2="29.6668"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#01B9DE" />
                            <stop offset="1" stop-color="#0190AD" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_3229_2569"
                            x1="16"
                            y1="18.3334"
                            x2="16"
                            y2="29.3334"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#01B9DE" />
                            <stop offset="1" stop-color="#0190AD" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_3229_2569"
                            x1="16"
                            y1="2.66669"
                            x2="16"
                            y2="13.3334"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#01B9DE" />
                            <stop offset="1" stop-color="#0190AD" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="stat-title text-white">Pelanggan Baru</div>
                  <div className="stat-value text-white">
                    {data?.thisMonthCustomerCount}
                  </div>
                  <div className="stat-desc text-white">
                    ↗︎ (
                    {data?.customerGrowth && isFinite(data.customerGrowth)
                      ? data.customerGrowth
                      : 0}
                    %) bulan ini
                  </div>
                </div>
              </div>

              <div className="stats shadow bg-[#01B9DE] ">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <div className="w-14 h-14 px-3 py-3  rounded-full bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.20615 21.1891C5.53191 18.4202 7.87862 16.3334 10.6667 16.3334H21.3333C24.1214 16.3334 26.4681 18.4202 26.7938 21.1891L27.6598 28.5499C27.7243 29.0984 27.332 29.5953 26.7835 29.6599C26.235 29.7244 25.738 29.332 25.6735 28.7835L24.8075 21.4228C24.6003 19.6611 23.1072 18.3334 21.3333 18.3334H10.6667C8.89279 18.3334 7.39971 19.6611 7.19245 21.4228L6.32648 28.7835C6.26195 29.332 5.76499 29.7244 5.21649 29.6599C4.66799 29.5953 4.27565 29.0984 4.34018 28.5499L5.20615 21.1891Z"
                          fill="url(#paint0_linear_3229_2590)"
                        />
                        <ellipse
                          cx="16"
                          cy="8.00002"
                          rx="5.33333"
                          ry="5.33333"
                          fill="url(#paint1_linear_3229_2590)"
                        />
                        <path
                          opacity="0.5"
                          d="M10.6667 18.3334V24C10.6667 26.5142 10.6667 27.7713 11.4477 28.5523C12.2288 29.3334 13.4858 29.3334 16 29.3334C18.5142 29.3334 19.7712 29.3334 20.5523 28.5523C21.3333 27.7713 21.3333 26.5142 21.3333 24V18.3334H10.6667Z"
                          fill="url(#paint2_linear_3229_2590)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3229_2590"
                            x1="16"
                            y1="16.3334"
                            x2="16"
                            y2="29.6668"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#01B9DE" />
                            <stop offset="1" stop-color="#0190AD" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_3229_2590"
                            x1="16"
                            y1="2.66669"
                            x2="16"
                            y2="13.3334"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#01B9DE" />
                            <stop offset="1" stop-color="#0190AD" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_3229_2590"
                            x1="16"
                            y1="18.3334"
                            x2="16"
                            y2="29.3334"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#01B9DE" />
                            <stop offset="1" stop-color="#0190AD" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="stat-title text-white">Jumlah Pelanggan</div>
                  <div className="stat-value text-white">
                    {data?.customerCount}
                  </div>
                  <div className="stat-desc text-white"># semua pelanggan </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
