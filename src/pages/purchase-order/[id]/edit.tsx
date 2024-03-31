import Layout from '~/components/Layout'
import PurchaseOrderForm from '~/sections/purchase-order-section/PurchaseOrderForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function EditPurchaseOrder() {
  const router = useRouter()

  const id = router.query.id as string

  const { mutate } = api.purchaseOrder.update.useMutation()

  const { data, isLoading } = api.purchaseOrder.getById.useQuery(
    {
      id
    },
    {
      enabled: !!id
    }
  )

  const utils = api.useUtils()

  return (
    <Layout>
      <>
        {data && !isLoading && (
          <PurchaseOrderForm
            handleEdit={(data) => {
              mutate(
                {
                  id,
                  ...data
                },
                {
                  onSuccess: () => {
                    void utils.purchaseOrder.getById.invalidate({ id })
                    void utils.purchaseOrder.get.invalidate()
                    void router.push('/purchase-order')
                  }
                }
              )
            }}
            defaultValues={{
              ...data
            }}
            mode="edit"
          />
        )}
      </>
    </Layout>
  )
}
