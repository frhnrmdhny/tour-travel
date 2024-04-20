import { useRouter } from 'next/router'
import { useCallback, type RefObject } from 'react'
import { api } from '~/utils/api'
import { createPortal } from 'react-dom'
import PartnerBalanceHistoryForm from './PartnerBalanceHistoryForm'

interface Props {
  withdrawPartnerBalanceHistoryDialogRef: RefObject<HTMLDialogElement>
}

export default function ({ withdrawPartnerBalanceHistoryDialogRef }: Props) {
  const { mutate } = api.partnerBalanceHistory.add.useMutation()

  const router = useRouter()
  const partnerId = router.query.id as string
  const utils = api.useUtils()

  const close = useCallback(() => {
    withdrawPartnerBalanceHistoryDialogRef.current?.close()
  }, [withdrawPartnerBalanceHistoryDialogRef])

  if (typeof window === 'object') {
    return createPortal(
      <dialog className="modal" ref={withdrawPartnerBalanceHistoryDialogRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Withdraw</h3>
          <div className="modal-action">
            <PartnerBalanceHistoryForm
              handleCreate={(data) => {
                mutate(data, {
                  onSuccess: async () => {
                    await utils.partnerBalanceHistory.getByPartnerId.invalidate(
                      {
                        partnerId
                      }
                    )
                    await utils.partner.getById.invalidate({
                      id: partnerId
                    })
                    withdrawPartnerBalanceHistoryDialogRef.current?.close()
                  }
                })
              }}
              mode="create"
              defaultValues={{
                partnerId,
                type: 'WITHDRAW'
              }}
              close={close}
            />
          </div>
        </div>
      </dialog>,
      document.body
    )
  }

  return null
}
