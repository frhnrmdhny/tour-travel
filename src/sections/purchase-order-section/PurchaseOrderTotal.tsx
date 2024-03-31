import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'

export default function PurchaseOrderTotal() {
  const router = useRouter()
  const purchaseOrderId = router.query.id as string

  const { data: session } = useSession()
  const { data: purchaseOrder } = api.purchaseOrder.getById.useQuery(
    {
      id: purchaseOrderId
    },
    { enabled: !!purchaseOrderId && !!session?.user }
  )

  return (
    <div className="stats bg-neutral text-neutral-content">
      <div className="stat">
        <div className="stat-title text-base-300">Total</div>
        <div className="stat-value">
          Rp {purchaseOrder?.total.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
