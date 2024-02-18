import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'

type BankAccountFormState = RouterInput['bankAccount']['add']

interface Props {
  handleCreate?: (data: BankAccountFormState) => void
  handleEdit?: (data: Partial<BankAccountFormState>) => void
  defaultValues?: Partial<BankAccountFormState>
  mode: 'edit' | 'create'
  close: () => void
}

export default function BankAccountForm({
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
  } = useForm<BankAccountFormState>({
    defaultValues: defaultValues
  })

  const onSubmit = useCallback(
    (data: BankAccountFormState) => {
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
      <p>Nama Bank</p>
      <input
        className="input input-bordered input-sm"
        {...register('bankName', { required: true })}
      />

      <p>Nama Pemilik</p>
      <input
        className="input input-bordered input-sm"
        {...register('ownerName', { required: true })}
      />

      <p>No Rekening</p>
      <input
        className="input input-bordered input-sm"
        {...register('accountNumber', { required: true })}
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
