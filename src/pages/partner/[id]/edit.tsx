import Layout from '~/components/Layout'
import PartnerForm from '~/sections/partner-section/PartnerForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function EditPartner() {
  const router = useRouter()

  const id = router.query.id as string

  const { mutate } = api.partner.update.useMutation()

  const { data, isLoading } = api.partner.getById.useQuery(
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
          <PartnerForm
            handleEdit={(data) => {
              mutate(
                {
                  id,
                  ...data
                },
                {
                  onSuccess: () => {
                    void utils.partner.getById.invalidate({ id })
                    void utils.partner.get.invalidate()
                    void router.push('/partner')
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
