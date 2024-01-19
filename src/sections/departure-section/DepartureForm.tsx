import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'

type DepartureFormState = Omit<
  RouterInput['departure']['add'],
  'id' | 'departureDate' | 'returnDate'
> & {
  departureDate: string | Date
  returnDate: string | Date
}

interface Props {
  handleSubmitCallback: (data: DepartureFormState) => void
  defaultValues?: DepartureFormState
  mode: 'edit' | 'create'
}

const fallbackDefaultValues: Partial<DepartureFormState> = {
  status: 'PREPARING'
}

export default function DepartureForm({
  handleSubmitCallback,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isDirty }
  } = useForm<DepartureFormState>({
    defaultValues:
      {
        ...defaultValues,
        departureDate: dayjs(defaultValues?.departureDate).format(
          'YYYY-MM-DDTHH:mm:ss'
        ),
        returnDate: dayjs(defaultValues?.returnDate).format(
          'YYYY-MM-DDTHH:mm:ss'
        )
      } ?? fallbackDefaultValues
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

      <p>Tanggal Keberangkatan</p>
      <input
        className="input input-bordered input-sm"
        type="datetime-local"
        {...register('departureDate', {
          required: true,
          valueAsDate: true
        })}
      />

      <p>Tanggal Kembali</p>
      <input
        className="input input-bordered input-sm"
        type="datetime-local"
        {...register('returnDate', { required: true, valueAsDate: true })}
      />

      <p>Status</p>
      <select
        {...register('status', { required: true })}
        className="select select-bordered select-sm"
      >
        <option value="PREPARING">Persiapan</option>
        <option value="ONGOING">Dalam Perjalanan</option>
        <option value="FINISH">Selesai</option>
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
