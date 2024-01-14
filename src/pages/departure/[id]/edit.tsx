import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import DepartureForm from '~/sections/departure-section/DepartureForm'
import dayjs from 'dayjs'

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
            handleSubmitCallback={(data) => {
              const { departureDate, returnDate, ...rest } = data

              mutate(
                {
                  id,
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
                  onSuccess: () => {
                    void utils.departure.getById.invalidate({ id })
                    void router.push('/departure')
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
