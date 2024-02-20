import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'

type CustomerBalanceHistoryFormState =
  RouterInput['customerBalanceHistory']['add']

interface Props {
  handleCreate?: (data: CustomerBalanceHistoryFormState) => void
  handleEdit?: (data: Partial<CustomerBalanceHistoryFormState>) => void
  defaultValues?: Partial<CustomerBalanceHistoryFormState>
  mode: 'edit' | 'create'
  close: () => void
}

export default function CustomerBalanceHistoryForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode,
  close
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<CustomerBalanceHistoryFormState>({
    defaultValues: defaultValues
  })

  const onSubmit = useCallback(
    (data: CustomerBalanceHistoryFormState) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <p>Amount</p>
      <input
        className="input input-bordered input-sm"
        {...register('amount', { required: true, valueAsNumber: true })}
      />

      <p>Description</p>
      <textarea
        className="textarea textarea-bordered textarea-sm"
        {...register('description', { required: true })}
        rows={2}
      />

      <button
        disabled={!isDirty}
        className="btn btn-primary btn-sm mt-4"
        type="submit"
      >
        {mode === 'create' ? 'Tambahkan' : 'Sunting'}
      </button>

      <button
        className="btn btn-warning btn-sm"
        onClick={(e) => {
          e.preventDefault()
          close()
        }}
      >
        Cancel
      </button>
    </form>
  )
}
