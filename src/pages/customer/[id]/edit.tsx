import Layout from '~/components/Layout'
import CustomerForm from '~/sections/customer-section/CustomerForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import { transformStringToDate } from '~/utils/form'
import { type RouterInput } from '~/server/api/root'

export default function EditCustomer() {
  const router = useRouter()

  const id = router.query.id as string

  const { mutate } = api.customer.update.useMutation()

  const { data, isLoading } = api.customer.getById.useQuery(
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
            handleEdit={(data) => {
              const transformedData = transformStringToDate<
                RouterInput['customer']['update']
              >(['departureDate', 'returnDate'], { ...data, id })

              mutate(transformedData, {
                onSuccess: () => {
                  void utils.customer.getById.invalidate({ id })
                  void utils.customer.get.invalidate()
                  void router.push('/customer')
                }
              })
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
