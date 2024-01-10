import Layout from '~/components/Layout'
import CustomerForm from '~/sections/customer-section/CustomerForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function EditCustomer() {
  const router = useRouter()

  const id = router.query.id as string

  const { mutate } = api.customer.updateCustomer.useMutation()

  const { data, isLoading } = api.customer.getCustomer.useQuery(
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
          <CustomerForm
            handleSubmitCallback={(data) => {
              mutate(
                {
                  id,
                  ...data
                },
                {
                  onSuccess: () => {
                    void utils.customer.getCustomer.invalidate({ id })
                    void router.push('/customer')
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
