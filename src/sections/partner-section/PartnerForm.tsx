import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'

type PartnerFormState = RouterInput['partner']['add']

interface Props {
  handleCreate?: (data: PartnerFormState) => void
  handleEdit?: (data: Partial<PartnerFormState>) => void
  defaultValues?: PartnerFormState
  mode: 'edit' | 'create'
}

export default function PartnerForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<PartnerFormState>({
    defaultValues: defaultValues
  })

  const onSubmit = useCallback(
    (data: PartnerFormState) => {
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

      <p>Email</p>
      <input
        className="input input-bordered input-sm"
        {...register('email', { required: true })}
      />

      <p>Alamat</p>
      <textarea
        className="textarea textarea-bordered textarea-sm"
        {...register('address', { required: true })}
        rows={2}
      />

      <p>NIK</p>
      <input
        className="input input-bordered input-sm"
        {...register('identityNumber', { required: true })}
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
