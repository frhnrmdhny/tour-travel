import { type Customer } from '@prisma/client'
import { useForm } from 'react-hook-form'

type CustomerFormState = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>

interface Props {
  handleSubmitCallback: (data: CustomerFormState) => void
  defaultValues?: CustomerFormState
  mode: 'edit' | 'create'
}

const fallbackDefaultValues: Partial<CustomerFormState> = {
  gender: 'MALE'
}

export default function CustomerForm({
  handleSubmitCallback,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isDirty }
  } = useForm<CustomerFormState>({
    defaultValues: defaultValues ?? fallbackDefaultValues
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

      <p>Email</p>
      <input
        className="input input-bordered input-sm"
        {...register('email', { required: true })}
      />

      <p>No Telepon</p>
      <input
        className="input input-bordered input-sm"
        {...register('phoneNumber', { required: true })}
      />

      <p>Alamat</p>
      <input
        className="input input-bordered input-sm"
        {...register('address', { required: true })}
      />

      <p>Umur</p>
      <input
        className="input input-bordered input-sm"
        {...register('age', { required: true, valueAsNumber: true })}
      />

      <p>Jenis Kelamin</p>
      <select
        {...register('gender', { required: true })}
        className="select select-bordered select-sm"
      >
        <option value="MALE">Laki-laki</option>
        <option value="FEMALE">Perempuan</option>
      </select>

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
