import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import EditBankAccountDialog from './EditBankAccountDialog'
import { type RefObject, useRef } from 'react'

interface Props {
  addBankAccountDialogRef: RefObject<HTMLDialogElement>
}

export default function AccountDetail({ addBankAccountDialogRef }: Props) {
  const router = useRouter()
  const partnerId = router.query.id as string

  const { data: bankAccounts } = api.bankAccount.getByPartnerId.useQuery(
    {
      partnerId
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

  return (
    <div>
      <div className="stats bg-neutral text-neutral-content">
        <div className="stat">
          <div className="stat-title">Saldo</div>
          <div className="stat-value">
            Rp {partner?.balance.toLocaleString()}
          </div>
          <div className="stat-actions">
            <button className="btn btn-sm">Withdrawal</button>
          </div>
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
