import { useRouter } from 'next/router'
import { useCallback, type RefObject } from 'react'
import { api } from '~/utils/api'
import { createPortal } from 'react-dom'
import CustomerBalanceHistoryForm from './CustomerBalanceHistoryForm'

interface Props {
  addCustomerBalanceHistoryDialogRef: RefObject<HTMLDialogElement>
  type: 'DEPOSIT' | 'WITHDRAW'
}

export default function AddCustomerBalanceHistoryDialog({
  addCustomerBalanceHistoryDialogRef,
  type
}: Props) {
  const { mutate } = api.customerBalanceHistory.add.useMutation()

  const router = useRouter()
  const customerId = router.query.id as string
  const utils = api.useUtils()

  const close = useCallback(() => {
    addCustomerBalanceHistoryDialogRef.current?.close()
  }, [addCustomerBalanceHistoryDialogRef])

  return createPortal(
    <dialog className="modal" ref={addCustomerBalanceHistoryDialogRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Add Bank Account</h3>
        <div className="modal-action">
          <CustomerBalanceHistoryForm
            handleCreate={(data) => {
              mutate(data, {
                onSuccess: () =>
                  void utils.customerBalanceHistory.getByCustomerId
                    .invalidate({
                      customerId
                    })
                    .then(() =>
                      addCustomerBalanceHistoryDialogRef.current?.close()
                    )
              })
            }}
            mode="create"
            defaultValues={{
              customerId,
              type
            }}
            close={close}
          />
        </div>
      </div>
    </dialog>,
    document.body
  )
}
