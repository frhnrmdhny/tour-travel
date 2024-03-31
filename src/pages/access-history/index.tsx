import { useSession } from 'next-auth/react'
import Layout from '~/components/Layout'
import usePagination from '~/hooks/usePagination'
import { api } from '~/utils/api'
import React from 'react'

export default function AccessHistory() {
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()
  const { data } = api.logHistory.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    { enabled: !!session?.user }
  )

  const currentRows = (paginationModel.page + 1) * paginationModel.pageSize
  const maxRows = data?.pagination.rowCount ? data?.pagination.rowCount : 0

  return (
    <Layout>
      <>
        <div>
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {data?.logHistory.map((event, index) => (
              <li key={index}>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={
                    index % 2 === 0
                      ? 'timeline-start md:text-end mb-10'
                      : 'timeline-end mb-10'
                  }
                >
                  <time className="font-mono italic">
                    {event.createdAt.toLocaleString()}
                  </time>
                  <div className="text-lg font-black">{event.user.name}</div>

                  <div className="collapse bg-base-200 mt-4">
                    <input type="radio" name="accordion-input" />
                    <div className="collapse-title text-xl font-medium">
                      Input Data
                    </div>
                    <div className="collapse-content">
                      {JSON.stringify(JSON.parse(event.input), undefined, 2)}
                    </div>
                  </div>

                  <div className="collapse bg-base-200 mt-4">
                    <input type="radio" name="accordion-output" />
                    <div className="collapse-title text-xl font-medium">
                      Output Data
                    </div>
                    <div className="collapse-content">
                      {JSON.stringify(JSON.parse(event.output), undefined, 2)}
                    </div>
                  </div>
                </div>

                <hr />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center mt-4">
          <div className="join">
            <button
              onClick={() =>
                setPaginationModel((c) => ({
                  ...c,
                  page: c.page - 1
                }))
              }
              className="join-item btn"
              disabled={paginationModel.page == 0}
            >
              «
            </button>
            <button className="join-item btn">
              Page {paginationModel.page + 1}
            </button>
            <button
              onClick={() =>
                setPaginationModel((c) => ({
                  ...c,
                  page: c.page + 1
                }))
              }
              className="join-item btn"
              disabled={currentRows >= maxRows}
            >
              »
            </button>
          </div>
        </div>
      </>
    </Layout>
  )
}
