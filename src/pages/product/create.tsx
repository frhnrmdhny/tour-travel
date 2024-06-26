import Layout from '~/components/Layout'
import ProductForm from '~/sections/product-section/ProductForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function CreateProduct() {
  const router = useRouter()

  const { mutate } = api.product.add.useMutation()
  const utils = api.useUtils()

  return (
    <Layout>
      <ProductForm
        handleCreate={(data) => {
          mutate(data, {
            onSuccess: () => {
              void utils.product.get.invalidate()
              void router.push('/product')
            }
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
