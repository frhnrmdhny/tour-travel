import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'

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

      <button
        disabled={!isDirty}
        className="btn btn-primary btn-sm mt-4"
        type="submit"
      >
        {mode === 'create' ? 'Tambahkan' : 'Sunting'}
      </button>
    </form>
  )
}
