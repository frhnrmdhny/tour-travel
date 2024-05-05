import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'
import EmployeePayroll from './EmployeePayroll'
import BackButton from '~/components/BackButton'

type EmployeeFormState = RouterInput['employee']['add']

interface Props {
  handleCreate?: (data: EmployeeFormState) => void
  handleEdit?: (data: Partial<EmployeeFormState>) => void
  defaultValues?: EmployeeFormState
  mode: 'edit' | 'create'
}

export default function EmployeeForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<EmployeeFormState>({
    defaultValues: {
      ...defaultValues
    }
  })

  const onSubmit = useCallback(
    (data: EmployeeFormState) => {
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

      <div className="grid grid-cols-3 gap-4">
        <div className={`${mode === 'edit' ? 'col-span-2' : 'col-span-3'}`}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <p className="text-gray-700 font-medium">
              Nama <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-md"
              placeholder="Masukkan nama mitra"
              {...register('name', { required: true })}
            />

            <p className="text-gray-700 font-medium">
              Email <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-md"
              placeholder="Masukkan alamat email"
              {...register('email', { required: true })}
            />

            <p className="text-slate-700 font-medium leading-normal">
              Title <span className="text-red-600"> *</span>
            </p>
            <select
              {...register('title', { required: true })}
              className="select select-bordered select-md"
            >
              {['Pilih Category'].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <p className="text-gray-700 font-medium">
              Description <span className="text-red-600"> *</span>
            </p>
            <label className="form-control">
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Masukkan Description"
                {...register('description', { required: true })}
              ></textarea>
              <div className="label justify-end">
                <span className="label-text-alt">0/500</span>
              </div>
            </label>

            <p className="text-gray-700 font-medium">
              {' '}
              Salary <span className="text-red-600"> *</span>
            </p>
            <label className="input input-bordered input-md flex items-center gap-2">
              Rp
              <input
                type="text"
                className="grow"
                placeholder="1.000.000"
                {...register('salary', { required: true, valueAsNumber: true })}
              />
            </label>

            <p className="text-slate-700 font-medium leading-normal">
              Bank Account <span className="text-red-600"> *</span>
            </p>
            <select
              {...register('bankAccount', { required: true })}
              className="select select-bordered select-md"
            >
              {['Bank Mandiri'].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button
              disabled={!isDirty}
              className="btn bg-[#01B9DE] btn-sm mt-4"
              type="submit"
            >
              {mode === 'create' ? 'Tambahkan' : 'Sunting'}
            </button>
          </form>
        </div>
        {mode === 'edit' && <EmployeePayroll />}
      </div>
    </>
  )
}
