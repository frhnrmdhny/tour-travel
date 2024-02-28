import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import DepartureForm from '~/sections/departure-section/DepartureForm'
import { transformStringToDate } from '~/utils/form'
import { type RouterInput } from '~/server/api/root'

export default function EditDeparture() {
  const router = useRouter()

  const id = router.query.id as string

  const { mutate } = api.departure.update.useMutation()

  const { data, isLoading } = api.departure.getById.useQuery(
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
          <DepartureForm
            handleEdit={(data) => {
              const transformedData = transformStringToDate<
                RouterInput['departure']['update']
              >(['departureDate', 'returnDate'], { ...data, id })

              mutate(transformedData, {
                onSuccess: () => {
                  void utils.departure.getById.invalidate({ id })
                  void utils.departure.get.invalidate()
                  void router.push('/departure')
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
