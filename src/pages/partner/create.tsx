import Layout from '~/components/Layout'
import PartnerForm from '~/sections/partner-section/PartnerForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function Createpartner() {
  const router = useRouter()

  const { mutate } = api.partner.add.useMutation()
  const utils = api.useUtils()

  return (
    <Layout>
      <PartnerForm
        handleCreate={(data) => {
          mutate(data, {
            onSuccess: (data) => {
              void utils.partner.get.invalidate()
              void router.push(`/partner/${data.id}/edit`)
            }
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
