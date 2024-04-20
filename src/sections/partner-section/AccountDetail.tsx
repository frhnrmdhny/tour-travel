import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import EditBankAccountDialog from './EditBankAccountDialog'
import { type RefObject, useRef } from 'react'
import WithdrawPartnerBalanceHistoryDialog from './WithdrawPartnerBalanceHistoryDialog'
import usePagination from '~/hooks/usePagination'
import { Pagination } from '@mui/material'

interface Props {
  addBankAccountDialogRef: RefObject<HTMLDialogElement>
}

export default function AccountDetail({ addBankAccountDialogRef }: Props) {
  const router = useRouter()
  const partnerId = router.query.id as string

  const [paginationModel, setPaginationModel] = usePagination()

  const { data: bankAccounts } = api.bankAccount.getByPartnerId.useQuery(
    {
      partnerId
    },
    {
      enabled: !!partnerId
    }
  )

  const { data } = api.partnerBalanceHistory.getByPartnerId.useQuery(
    {
      partnerId,
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    },
    {
      enabled: !!partnerId
    }
  )

  const { data: partner } = api.partner.getById.useQuery(
    {
      id: partnerId
    },
    {
      enabled: !!partnerId
    }
  )

  const withdrawDialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <WithdrawPartnerBalanceHistoryDialog
        withdrawPartnerBalanceHistoryDialogRef={withdrawDialogRef}
      />

      <div className="w-full">
        <div className="stats bg-neutral text-neutral-content w-full">
          <div className="stat">
            <div className="stat-title">Saldo</div>
            <div className="stat-value">
              Rp {partner?.balance.toLocaleString()}
            </div>
            <div className="stat-actions">
              <button
                onClick={() => withdrawDialogRef.current?.showModal()}
                className="btn btn-sm"
              >
                Withdrawal
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 stats bg-neutral text-neutral-content w-full pb-3">
          <div className="stat text-neutral-content ">
            <div className="stat-title text-base-300">History</div>

            {data?.partnerBalanceHistories?.map((history) => (
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

            {data && (
              <div className="bg-white p-2 rounded-xl mt-4 flex justify-center">
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  count={data.pagination.pageCount}
                  page={data.pagination.page + 1}
                  onChange={(_, page) =>
                    setPaginationModel((c) => ({ ...c, page: page - 1 }))
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center mt-2">
          <p>Bank Account</p>
          <button
            onClick={(e) => {
              e.preventDefault()
              addBankAccountDialogRef.current?.showModal()
            }}
            className="btn btn-xs"
          >
            Bank Account +
          </button>
        </div>

        <div className="flex gap-2 flex-col mt-2">
          {bankAccounts?.map((bankAccount) => (
            <div
              className="card w-full bg-neutral text-neutral-content"
              key={bankAccount.id}
            >
              <div className="card-body">
                <h2 className="card-title">{bankAccount.bankName}</h2>
                <p>{bankAccount.ownerName}</p>
                <p>{bankAccount.accountNumber}</p>
                <CardAction
                  partnerId={partnerId}
                  bankAccountId={bankAccount.id}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

type CardActionProps = {
  partnerId: string
  bankAccountId: string
}

function CardAction({ partnerId, bankAccountId }: CardActionProps) {
  const { mutate: deleteBankAccount } = api.bankAccount.delete.useMutation()
  const utils = api.useUtils()
  const editBankAccountDialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <EditBankAccountDialog
        editBankAccountDialogRef={editBankAccountDialogRef}
        bankAccountId={bankAccountId}
      />

      <div className="card-actions justify-end">
        <button
          className="btn btn-info btn-sm"
          onClick={(e) => {
            e.preventDefault()
            editBankAccountDialogRef.current?.showModal()
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-warning btn-sm"
          onClick={(e) => {
            e.preventDefault()
            deleteBankAccount(
              {
                id: bankAccountId
              },
              {
                onSuccess: () =>
                  void utils.bankAccount.getByPartnerId.invalidate({
                    partnerId
                  })
              }
            )
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}
