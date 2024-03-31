import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import PurchaseOrderForm from '~/sections/purchase-order-section/PurchaseOrderForm'
import { transformStringToDate } from '~/utils/form'
import { type RouterInput } from '~/server/api/root'

export default function CreatePurchaseOrder() {
  const router = useRouter()

  const { mutate } = api.purchaseOrder.add.useMutation()

  const utils = api.useUtils()

  return (
    <Layout>
      <PurchaseOrderForm
        handleCreate={(data) => {
          const transformedData = transformStringToDate<
            RouterInput['purchaseOrder']['add']
          >(['completedDate'], data)

          mutate(transformedData, {
            onSuccess: (data) => {
              void utils.purchaseOrder.get.invalidate()
              void router.push(`/purchase-order/${data.id}/edit`)
            }
          })
        }}
        mode="create"
        defaultValues={{
          total: 0,
          status: 'NEW'
        }}
      />
    </Layout>
  )
}
