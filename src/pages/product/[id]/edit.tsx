import Layout from '~/components/Layout'
import ProductForm from '~/sections/product-section/ProductForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function EditProduct() {
  const router = useRouter()

  const id = router.query.id as string

  const { mutate } = api.product.update.useMutation()

  const { data, isLoading } = api.product.getById.useQuery(
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
          <ProductForm
            handleSubmitCallback={(data) => {
              mutate(
                {
                  id,
                  ...data
                },
                {
                  onSuccess: () => {
                    void utils.product.getById.invalidate({ id })
                    void router.push('/product')
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
