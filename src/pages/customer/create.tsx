import Layout from '~/components/Layout'
import CustomerForm from '~/sections/customer-section/CustomerForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function CreateCustomer() {
  const router = useRouter()

  const { mutate } = api.customer.createCustomer.useMutation()

  return (
    <Layout>
      <CustomerForm
        handleSubmitCallback={(data) => {
          mutate(data, {
            onSuccess: void router.push('/customer')
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
