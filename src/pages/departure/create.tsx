import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import DepartureForm from '~/sections/departure-section/DepartureForm'
import dayjs from 'dayjs'

export default function CreateDeparture() {
  const router = useRouter()

  const { mutate } = api.departure.createDeparture.useMutation()

  return (
    <Layout>
      <DepartureForm
        handleSubmitCallback={(data) => {
          const { departureDate, returnDate, ...rest } = data
          mutate(
            {
              ...rest,
              departureDate:
                typeof departureDate === 'string'
                  ? dayjs(departureDate).toDate()
                  : departureDate,
              returnDate:
                typeof returnDate === 'string'
                  ? dayjs(returnDate).toDate()
                  : returnDate
            },
            {
              onSuccess: void router.push('/departure')
            }
          )
        }}
        mode="create"
      />
    </Layout>
  )
}
