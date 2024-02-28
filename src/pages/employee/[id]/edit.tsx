import Layout from '~/components/Layout'
import EmployeeForm from '~/sections/employee-section/EmployeeForm'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

export default function EditEmployee() {
  const router = useRouter()

  const id = router.query.id as string

  const { mutate } = api.employee.update.useMutation()

  const { data, isLoading } = api.employee.getById.useQuery(
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
          <EmployeeForm
            handleEdit={(data) => {
              mutate(
                {
                  id,
                  ...data
                },
                {
                  onSuccess: () => {
                    void utils.employee.getById.invalidate({ id })
                    void utils.employee.get.invalidate()
                    void router.push('/employee')
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
