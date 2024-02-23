import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import AddCustomerBalanceHistoryDialog from './AddCustomerBalanceHistoryDialog'
import { useRef } from 'react'

export default function CustomerAdditionalInformation() {
  const router = useRouter()
  const customerId = router.query.id as string
  const { data } = api.customerBalanceHistory.getByCustomerId.useQuery(
    {
      customerId
    },
    {
      enabled: !!customerId
    }
  )

  const withdrawDialogRef = useRef<HTMLDialogElement>(null)
  const depositDialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <AddCustomerBalanceHistoryDialog
        type="WITHDRAW"
        addCustomerBalanceHistoryDialogRef={withdrawDialogRef}
      />

      <AddCustomerBalanceHistoryDialog
        type="DEPOSIT"
        addCustomerBalanceHistoryDialogRef={depositDialogRef}
      />

      <div>
        <div className="stats bg-neutral text-neutral-content">
          <div className="stat">
            <div className="stat-title text-base-300">Saldo</div>
            <div className="stat-value">
              Rp {data?.balance.toLocaleString()}
            </div>
            <div className="stat-actions">
              <button
                className="btn btn-sm"
                onClick={() => withdrawDialogRef.current?.showModal()}
              >
                Withdrawal
              </button>
              <button
                className="btn btn-sm ml-2"
                onClick={() => depositDialogRef.current?.showModal()}
              >
                Deposit
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 stats bg-neutral text-neutral-content w-full pb-3">
          <div className="stat text-neutral-content ">
            <div className="stat-title text-base-300">History</div>

            {data?.customerBalanceHistories.map((history) => (
              <div
                key={history.id}
                className="card bg-base-content text-base shadow-2xl p-4 mt-2"
              >
                <p>{history.createdAt.toLocaleString()}</p>
                <p>{history.type}</p>
                <p>{history.description}</p>
                <p className="text text-right">
                  Rp. {history.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
