import { useRouter } from 'next/router'
import { useCallback, type RefObject } from 'react'
import { api } from '~/utils/api'
import BankAccountForm from './BankAccountForm'
import { createPortal } from 'react-dom'

interface Props {
  addBankAccountDialogRef: RefObject<HTMLDialogElement>
}

export default function AddBankAccountDialog({
  addBankAccountDialogRef
}: Props) {
  const { mutate } = api.bankAccount.add.useMutation()

  const router = useRouter()
  const partnerId = router.query.id as string
  const utils = api.useUtils()

  const close = useCallback(() => {
    addBankAccountDialogRef.current?.close()
  }, [addBankAccountDialogRef])

  return createPortal(
    <dialog className="modal" ref={addBankAccountDialogRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Add Bank Account</h3>
        <div className="modal-action">
          <BankAccountForm
            handleCreate={(data) => {
              mutate(data, {
                onSuccess: () =>
                  void utils.bankAccount.getByPartnerId
                    .invalidate({
                      partnerId
                    })
                    .then(() => addBankAccountDialogRef.current?.close())
              })
            }}
            mode="create"
            defaultValues={{
              partnerId
            }}
            close={close}
          />
        </div>
      </div>
    </dialog>,
    document.body
  )
}
