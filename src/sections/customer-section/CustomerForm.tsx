import { useForm } from 'react-hook-form'

type CustomerFormState = {
  name: string
  email: string
  phoneNumber: string
  address: string
  age: number
  gender: 'MALE' | 'FEMALE'
}

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
      <p>Name</p>
      <input
        className="input input-bordered input-sm"
        {...register('name', { required: true })}
      />

      <p>Email</p>
      <input
        className="input input-bordered input-sm"
        {...register('email', { required: true })}
      />

      <p>Phone Number</p>
      <input
        className="input input-bordered input-sm"
        {...register('phoneNumber', { required: true })}
      />

      <p>Address</p>
      <input
        className="input input-bordered input-sm"
        {...register('address', { required: true })}
      />

      <p>Age</p>
      <input
        className="input input-bordered input-sm"
        {...register('age', { required: true, valueAsNumber: true })}
      />

      <p>Gender</p>
      <select
        {...register('gender', { required: true })}
        className="select select-bordered select-sm"
      >
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      <button
        disabled={!isDirty}
        className="btn btn-primary btn-sm mt-4"
        type="submit"
      >
        {mode === 'create' ? 'Create' : 'Edit'}
      </button>
    </form>
  )
}
