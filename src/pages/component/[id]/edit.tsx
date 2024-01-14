import Layout from '~/components/Layout'
import ComponentForm from '~/sections/component-section/ComponentForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function EditComponent() {
  const router = useRouter()

  const id = router.query.id as string

  const { mutate } = api.component.update.useMutation()

  const { data, isLoading } = api.component.getById.useQuery(
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
          <ComponentForm
            handleSubmitCallback={(data) => {
              mutate(
                {
                  id,
                  ...data
                },
                {
                  onSuccess: () => {
                    void utils.component.getById.invalidate({ id })
                    void router.push('/component')
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
