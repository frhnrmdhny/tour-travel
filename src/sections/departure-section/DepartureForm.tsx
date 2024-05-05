import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'
import BackButton from '~/components/BackButton'

type DepartureFormState = Omit<
  RouterInput['departure']['add'],
  'departureDate' | 'returnDate'
> & {
  departureDate: string | Date
  returnDate: string | Date
}

interface Props {
  handleCreate?: (data: DepartureFormState) => void
  handleEdit?: (data: Partial<DepartureFormState>) => void
  defaultValues?: DepartureFormState
  mode: 'edit' | 'create'
}

const fallbackDefaultValues: Partial<DepartureFormState> = {
  status: 'PREPARING'
}

export default function DepartureForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<DepartureFormState>({
    defaultValues:
      {
        ...defaultValues,
        departureDate: dayjs(defaultValues?.departureDate).format(
          'YYYY-MM-DDTHH:mm'
        ),
        returnDate: dayjs(defaultValues?.returnDate).format('YYYY-MM-DDTHH:mm')
      } ?? fallbackDefaultValues
  })

  const onSubmit = useCallback(
    (data: DepartureFormState) => {
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
    <>
      <BackButton label={`${mode === 'edit' ? 'Edit' : 'Tambah'} Departure`} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <p className="text-gray-700">
          Nama <span className="text-red-600"> *</span>
        </p>
        <input
          className="input input-bordered input-sm"
          placeholder="Masukkan Keberangkatan"
          {...register('name', { required: true })}
        />

        <p className="text-gray-700">
          Tanggal Keberangkatan <span className="text-red-600"> *</span>
        </p>
        <input
          className="input input-bordered input-sm"
          type="datetime-local"
          {...register('departureDate', {
            required: true,
            valueAsDate: true
          })}
        />

        <p className="text-gray-700">
          Tanggal Kembali <span className="text-red-600"> *</span>
        </p>
        <input
          className="input input-bordered input-sm"
          type="datetime-local"
          {...register('returnDate', { required: true, valueAsDate: true })}
        />

        <p className="text-gray-700">
          Status <span className="text-red-600"> *</span>
        </p>
        <select
          {...register('status', { required: true })}
          className="select select-bordered select-sm"
          aria-placeholder="Persiapan"
        >
          <option value="PREPARING">Persiapan</option>
          <option value="ONGOING">Dalam Perjalanan</option>
          <option value="FINISH">Selesai</option>
        </select>

        <button
          disabled={!isDirty}
          className="btn bg-[#01B9DE] hover:bg-sky-400 btn-sm mt-4"
          type="submit"
        >
          {mode === 'create' ? 'Tambahkan' : 'Sunting'}
        </button>
      </form>
    </>
  )
}
