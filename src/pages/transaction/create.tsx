import Layout from '~/components/Layout'
import TransactionForm from '~/sections/transaction-section/TransactionForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function CreateTransaction() {
  const router = useRouter()

  const { mutate } = api.transaction.add.useMutation()
  const utils = api.useUtils()

  return (
    <Layout>
      <TransactionForm
        handleCreate={(data) => {
          mutate(data, {
            onSuccess: () => {
              void utils.transaction.get.invalidate()
              void router.push(`/transaction`)
            }
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
