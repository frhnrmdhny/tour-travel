import { type Component } from '@prisma/client'
import { useForm } from 'react-hook-form'

type ComponentFormState = Omit<Component, 'id' | 'createdAt' | 'updatedAt'>

interface Props {
  handleSubmitCallback: (data: ComponentFormState) => void
  defaultValues?: ComponentFormState
  mode: 'edit' | 'create'
}

export default function ComponentForm({
  handleSubmitCallback,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isDirty }
  } = useForm<ComponentFormState>({
    defaultValues: defaultValues
  })

  return (
    <form
      onSubmit={handleSubmit(handleSubmitCallback)}
      className="flex flex-col gap-2"
    >
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
