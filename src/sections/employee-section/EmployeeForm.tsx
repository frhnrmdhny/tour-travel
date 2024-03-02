import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'
import EmployeePayroll from './EmployeePayroll'

type EmployeeFormState = Omit<
  RouterInput['employee']['add'],
  'employeeDate' | 'returnDate'
>

interface Props {
  handleCreate?: (data: EmployeeFormState) => void
  handleEdit?: (data: Partial<EmployeeFormState>) => void
  defaultValues?: EmployeeFormState
  mode: 'edit' | 'create'
}

export default function EmployeeForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<EmployeeFormState>({
    defaultValues: {
      ...defaultValues
    }
  })

  const onSubmit = useCallback(
    (data: EmployeeFormState) => {
      if (mode === 'edit') {
        handleEdit?.(getDirtyFields(dirtyFields, data))
      } else {
        handleCreate?.(data)
      }
    },
    [dirtyFields, handleCreate, handleEdit, mode]
  )

  const isDirty = useMemo(
    () => Object.keys(dirtyFields).length > 0,
    [dirtyFields]
  )

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className={`${mode === 'edit' ? 'col-span-2' : 'col-span-3'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <p>Nama</p>
          <input
            className="input input-bordered input-sm"
            {...register('name', { required: true })}
          />

          <p>Title</p>
          <input
            className="input input-bordered input-sm"
            {...register('title', { required: true })}
          />

          <p>Email</p>
          <input
            className="input input-bordered input-sm"
            {...register('email', { required: true })}
          />

          <p>Description</p>
          <input
            className="input input-bordered input-sm"
            {...register('description', { required: true })}
          />

          <p>Salary</p>
          <input
            className="input input-bordered input-sm"
            {...register('salary', { required: true, valueAsNumber: true })}
          />

          <p>Bank Account</p>
          <input
            className="input input-bordered input-sm"
            {...register('bankAccount', { required: true })}
          />

          <button
            disabled={!isDirty}
            className="btn btn-primary btn-sm mt-4"
            type="submit"
          >
            {mode === 'create' ? 'Tambahkan' : 'Sunting'}
          </button>
        </form>
      </div>
      {mode === 'edit' && <EmployeePayroll />}
    </div>
  )
}
