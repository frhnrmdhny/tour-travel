import { useRouter } from 'next/router'
import { useCallback, type RefObject } from 'react'
import { api } from '~/utils/api'
import BankAccountForm from './BankAccountForm'
import { createPortal } from 'react-dom'

interface Props {
  editBankAccountDialogRef: RefObject<HTMLDialogElement>
  bankAccountId: string
}

export default function EditBankAccountDialog({
  editBankAccountDialogRef,
  bankAccountId
}: Props) {
  const { mutate } = api.bankAccount.update.useMutation()

  const router = useRouter()
  const partnerId = router.query.id as string
  const utils = api.useUtils()

  const { data } = api.bankAccount.getById.useQuery({
    id: bankAccountId
  })

  const close = useCallback(() => {
    editBankAccountDialogRef.current?.close()
  }, [editBankAccountDialogRef])

  if (!data) return null

  return createPortal(
    <dialog className="modal" ref={editBankAccountDialogRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Edit Bank Account</h3>
        <div className="modal-action">
          <BankAccountForm
            handleEdit={(data) => {
              mutate(
                {
                  id: bankAccountId,
                  ...data
                },
                {
                  onSuccess: () =>
                    void utils.bankAccount.getByPartnerId
                      .invalidate({
                        partnerId
                      })
                      .then(() => close())
                }
              )
            }}
            mode="edit"
            defaultValues={{
              accountNumber: data.accountNumber,
              bankName: data.bankName,
              ownerName: data.ownerName,
              partnerId: data.partnerId
            }}
            close={close}
          />
        </div>
      </div>
    </dialog>,
    document.body,
    bankAccountId
  )
}
