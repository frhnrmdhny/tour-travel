import Layout from '~/components/Layout'
import CustomerForm from '~/sections/customer-section/CustomerForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import { transformStringToDate } from '~/utils/form'
import { type RouterInput } from '~/server/api/root'

export default function CreateCustomer() {
  const router = useRouter()
  const { mutate } = api.customer.add.useMutation()
  const utils = api.useUtils()

  return (
    <Layout>
      <CustomerForm
        handleCreate={(data) => {
          const transformedData = transformStringToDate<
            RouterInput['customer']['add']
          >(['departureDate', 'returnDate'], data)

          mutate(transformedData, {
            onSuccess: () => {
              void utils.customer.get
                .invalidate()
                .then(() => router.push('/customer'))
            }
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
