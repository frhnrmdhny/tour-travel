import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { api } from '~/utils/api'
import { getDirtyFields } from '~/utils/form'
import BackButton from '~/components/BackButton'
import CustomerAdditionalInformation from './CustomerAdditionalInformation'
import ProfilePictureUpload from './ProfilePictureUpload'

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
    setValue,
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
      <BackButton label={`${mode === 'edit' ? 'Edit' : 'Tambah'} Customer`} />

      <div className="grid grid-cols-3 gap-4">
        <div className={`${mode === 'edit' ? 'col-span-2' : 'col-span-3'}`}>
          <ProfilePictureUpload
            onUrlChange={(url) =>
              setValue('profilePictureUrl', url, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
              })
            }
            currentProfilePictureUrl={defaultValues?.profilePictureUrl}
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 py-2"
          >
            <p className="font-md">Title</p>
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

            <p className="text-slate-700 font-medium leading-normal">
              Nama Jamaah{' '}
              <span className="text-gray-400 text-xs font-medium">
                {' '}
                (Sesuai pada kartu Vaksin){' '}
                <span className="text-red-600"> *</span>{' '}
              </span>{' '}
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan nama jamaah"
              {...register('nameVaccine', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Nama Paspor <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan nama paspor"
              {...register('namePassport', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Nomor Paspor <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan nomor paspor"
              {...register('passportNumber', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Kota Paspor <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan kota paspor"
              {...register('passportCity', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Tanggal Paspor Dikeluarkan{' '}
              <span className="text-red-600"> *</span>{' '}
            </p>
            <input
              className="input input-bordered input-sm"
              type="date"
              {...register('passportIssuedDate', {
                required: true,
                valueAsDate: true
              })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Nama Ayah<span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan nama ayah"
              {...register('fatherName', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Jenis Identitas <span className="text-red-600"> *</span>
            </p>
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

            <p className="text-slate-700 font-medium leading-normal">
              Nomor Identitas <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan nomor identitas"
              {...register('identityNumber', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Tempat Lahir <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan tempat lahir"
              {...register('birthplace', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Tanggal Lahir <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              type="date"
              {...register('birthdate', {
                required: true,
                valueAsDate: true
              })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Alamat <span className="text-red-600"> *</span>
            </p>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Masukkan Alamat"
              {...register('address', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Provinsi <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Pilih Provinsi"
              {...register('province', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Kota / Kabupaten <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Pilih Kota atau Kabupaten"
              {...register('city', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Kecamatan <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Pilih Kecamatan"
              {...register('subdistrict', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Kelurahan <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Pilih Kelurahan"
              {...register('ward', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Nomor Telepon <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan Nomor Telephone"
              {...register('phoneNumber', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Nomor Handphone <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Massukkan Nomor Handphone"
              {...register('mobileNumber', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Kewarganegaraan <span className="text-red-600"> *</span>
            </p>
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

            <p className="text-slate-700 font-medium leading-normal">
              Status Pernikahan <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Belum Menikah"
              {...register('mobileNumber', { required: true })}
            />
            <p className="text-slate-700 font-medium leading-normal">
              Pendidikan <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="SMP/MTS"
              {...register('mobileNumber', { required: true })}
            />
            <p className="text-slate-700 font-medium leading-normal">
              Pekerjaan <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Lainnya"
              {...register('mobileNumber', { required: true })}
            />

            {martialStatus && (
              <>
                <p>Status Pernikahan</p>
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
                <p>Pendidikan</p>
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
                <p>Pekerjaan</p>
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
        </div>

        {mode === 'edit' && <CustomerAdditionalInformation />}
      </div>
    </>
  )
}
