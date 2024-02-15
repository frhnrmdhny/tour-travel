import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { api } from '~/utils/api'
import { getDirtyFields } from '~/utils/form'
import BackButton from '~/components/BackButton'

type CustomerFormState = Omit<
  RouterInput['customer']['add'],
  'birthdate' | 'passportIssuedDate'
> & {
  birthdate: string | Date
  passportIssuedDate: string | Date
}

interface Props {
  handleCreate?: (data: CustomerFormState) => void
  handleEdit?: (data: Partial<CustomerFormState>) => void
  defaultValues?: CustomerFormState
  mode: 'edit' | 'create'
}

const fallbackDefaultValues: Partial<CustomerFormState> = {
  title: 'TUAN',
  identityType: 'NIK',
  nationality: 'WNI'
}

export default function CustomerForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<CustomerFormState>({
    defaultValues:
      {
        ...defaultValues,
        birthdate: dayjs(defaultValues?.birthdate).format('YYYY-MM-DD'),
        passportIssuedDate: dayjs(defaultValues?.passportIssuedDate).format(
          'YYYY-MM-DD'
        )
      } ?? fallbackDefaultValues
  })

  const onSubmit = useCallback(
    (data: CustomerFormState) => {
      if (mode === 'edit') {
        handleEdit?.(getDirtyFields(dirtyFields, data))
      } else {
        handleCreate?.(data)
      }
    },
    [dirtyFields, handleCreate, handleEdit, mode]
  )

  const { data: martialStatus } = api.maritalStatus.get.useQuery()
  const { data: education } = api.education.get.useQuery()
  const { data: occupation } = api.occupation.get.useQuery()

  const isDirty = useMemo(
    () => Object.keys(dirtyFields).length > 0,
    [dirtyFields]
  )

  return (
    <>
      <BackButton />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <p>Title</p>
        <select
          {...register('title', { required: true })}
          className="select select-bordered select-sm"
        >
          {['TUAN', 'NONA', 'NYONYA'].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <p>Nama Jamaah (sesuai pada kartu vaksin)</p>
        <input
          className="input input-bordered input-sm"
          {...register('nameVaccine', { required: true })}
        />

        <p>Nama Paspor</p>
        <input
          className="input input-bordered input-sm"
          {...register('namePassport', { required: true })}
        />

        <p>No Paspor</p>
        <input
          className="input input-bordered input-sm"
          {...register('passportNumber', { required: true })}
        />

        <p>Kota Paspor</p>
        <input
          className="input input-bordered input-sm"
          {...register('passportCity', { required: true })}
        />

        <p>Tanggal Paspor Dikeluarkan</p>
        <input
          className="input input-bordered input-sm"
          type="date"
          {...register('passportIssuedDate', {
            required: true,
            valueAsDate: true
          })}
        />

        <p>Nama Ayah</p>
        <input
          className="input input-bordered input-sm"
          {...register('fatherName', { required: true })}
        />

        <p>Jenis Identitas</p>
        <select
          {...register('identityType', { required: true })}
          className="select select-bordered select-sm"
        >
          {['NIK', 'KITAS', 'KITAP', 'PASPOR'].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <p>No Identitas</p>
        <input
          className="input input-bordered input-sm"
          {...register('identityNumber', { required: true })}
        />

        <p>Tempat Lahir</p>
        <input
          className="input input-bordered input-sm"
          {...register('birthplace', { required: true })}
        />

        <p>Tanggal Lahir</p>
        <input
          className="input input-bordered input-sm"
          type="date"
          {...register('birthdate', {
            required: true,
            valueAsDate: true
          })}
        />

        <p>Alamat</p>
        <input
          className="input input-bordered input-sm"
          {...register('address', { required: true })}
        />

        <p>Provinsi</p>
        <input
          className="input input-bordered input-sm"
          {...register('province', { required: true })}
        />

        <p>Kota / Kabupaten</p>
        <input
          className="input input-bordered input-sm"
          {...register('city', { required: true })}
        />

        <p>Kecamatan</p>
        <input
          className="input input-bordered input-sm"
          {...register('subdistrict', { required: true })}
        />

        <p>Kelurahan</p>
        <input
          className="input input-bordered input-sm"
          {...register('ward', { required: true })}
        />

        <p>No Telepon</p>
        <input
          className="input input-bordered input-sm"
          {...register('phoneNumber', { required: true })}
        />

        <p>No Handphone</p>
        <input
          className="input input-bordered input-sm"
          {...register('mobileNumber', { required: true })}
        />

        <p>Kewarganegaraan</p>
        <select
          {...register('nationality', { required: true })}
          className="select select-bordered select-sm"
        >
          {['WNI', 'WNA'].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {martialStatus && (
          <>
            <p>Marital Status</p>
            <select
              {...register('maritalStatusId', { required: true })}
              className="select select-bordered select-sm"
            >
              {martialStatus.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </>
        )}

        {education && (
          <>
            <p>Marital Status</p>
            <select
              {...register('educationId', { required: true })}
              className="select select-bordered select-sm"
            >
              {education.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </>
        )}

        {occupation && (
          <>
            <p>Marital Status</p>
            <select
              {...register('occupationId', { required: true })}
              className="select select-bordered select-sm"
            >
              {occupation.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </>
        )}

        <button
          disabled={!isDirty}
          className="btn btn-primary btn-sm mt-4"
          type="submit"
        >
          {mode === 'create' ? 'Tambahkan' : 'Sunting'}
        </button>
      </form>
    </>
  )
}
