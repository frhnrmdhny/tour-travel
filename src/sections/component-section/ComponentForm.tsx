import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'

type ComponentFormState = RouterInput['component']['add']

interface Props {
  handleCreate?: (data: ComponentFormState) => void
  handleEdit?: (data: Partial<ComponentFormState>) => void
  defaultValues?: ComponentFormState
  mode: 'edit' | 'create'
}

export default function ComponentForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<ComponentFormState>({
    defaultValues: defaultValues
  })

  const onSubmit = useCallback(
    (data: ComponentFormState) => {
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

      <p>Deskripsi</p>
      <input
        className="input input-bordered input-sm"
        {...register('description', { required: true })}
      />

      <p>Harga</p>
      <input
        className="input input-bordered input-sm"
        {...register('price', { required: true, valueAsNumber: true })}
      />

      <p>Stock</p>
      <input
        className="input input-bordered input-sm"
        {...register('stock', { required: true, valueAsNumber: true })}
      />

      <p>Restock Level</p>
      <input
        className="input input-bordered input-sm"
        {...register('restockLevel', { required: true, valueAsNumber: true })}
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
