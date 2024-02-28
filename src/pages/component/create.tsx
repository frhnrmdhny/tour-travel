import Layout from '~/components/Layout'
import ComponentForm from '~/sections/component-section/ComponentForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function CreateComponent() {
  const router = useRouter()

  const { mutate } = api.component.add.useMutation()
  const utils = api.useUtils()

  return (
    <Layout>
      <ComponentForm
        handleCreate={(data) => {
          mutate(data, {
            onSuccess: () => {
              void utils.component.get.invalidate()
              void router.push('/component')
            }
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
