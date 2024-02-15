import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import DepartureForm from '~/sections/departure-section/DepartureForm'
import { transformStringToDate } from '~/utils/form'
import { type RouterInput } from '~/server/api/root'

export default function CreateDeparture() {
  const router = useRouter()

  const { mutate } = api.departure.add.useMutation()

  return (
    <Layout>
      <DepartureForm
        handleCreate={(data) => {
          const transformedData = transformStringToDate<
            RouterInput['departure']['add']
          >(['departureDate', 'returnDate'], data)

          mutate(transformedData, {
            onSuccess: void router.push('/departure')
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
