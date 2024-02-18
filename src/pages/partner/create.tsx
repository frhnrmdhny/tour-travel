import Layout from '~/components/Layout'
import PartnerForm from '~/sections/partner-section/PartnerForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function Createpartner() {
  const router = useRouter()

  const { mutate } = api.partner.add.useMutation()

  return (
    <Layout>
      <PartnerForm
        handleCreate={(data) => {
          mutate(data, {
            onSuccess: void router.push('/partner')
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
