import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import EmployeeForm from '~/sections/employee-section/EmployeeForm'

export default function CreateEmployee() {
  const router = useRouter()

  const { mutate } = api.employee.add.useMutation()

  const utils = api.useUtils()

  return (
    <Layout>
      <EmployeeForm
        handleCreate={(data) => {
          mutate(data, {
            onSuccess: () => {
              void utils.employee.get.invalidate()
              void router.push(`/employee`)
            }
          })
        }}
        mode="create"
      />
    </Layout>
  )
}
