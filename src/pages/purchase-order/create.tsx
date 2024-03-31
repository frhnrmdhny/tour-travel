import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import PurchaseOrderForm from '~/sections/purchase-order-section/PurchaseOrderForm'

export default function CreatePurchaseOrder() {
  const router = useRouter()

  const { mutate } = api.purchaseOrder.add.useMutation()

  const utils = api.useUtils()

  return (
    <Layout>
      <PurchaseOrderForm
        handleCreate={(data) => {
          mutate(data, {
            onSuccess: (data) => {
              void utils.purchaseOrder.get.invalidate()
              void router.push(`/purchase-order/${data.id}/edit`)
            }
          })
        }}
        mode="create"
        defaultValues={{
          total: 0
        }}
      />
    </Layout>
  )
}
