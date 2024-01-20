import Layout from '~/components/Layout'
import TransactionForm from '~/sections/transaction-section/TransactionForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function CreateTransaction() {
  const router = useRouter()

  const { mutate } = api.transaction.add.useMutation()

  return (
    <Layout>
      <TransactionForm
        handleSubmitCallback={(data) => {
          mutate(data, {
            onSuccess: void router.push('/transaction')
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
