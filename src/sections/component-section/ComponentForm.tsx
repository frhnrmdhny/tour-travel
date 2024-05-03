import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'
import BackButton from '~/components/BackButton'

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
    <>
      <div className="py-2 flex">
        <BackButton />
        <div className="px-2 items-center">
          <h1 className="font-bold text-gray-800 text-poppins">
            Tambah Component
          </h1>
          <h3 className="text-sm text-slate-500">
            Pages / Component / Tambah Component
          </h3>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <p className="text-gray-700 font-medium">
          Nama <span className="text-red-600"> *</span>
        </p>
        <input
          className="input input-bordered input-md"
          placeholder="Masukkan Nama"
          {...register('name', { required: true })}
        />

        <p className="text-gray-700 font-medium">
          Deskripsi <span className="text-red-600"> *</span>
        </p>
        <textarea
          className="textarea textarea-bordered textarea-md w-full"
          placeholder="Masukkan deskripsi"
          {...register('description', { required: true })}
        />

        <p className="text-gray-700 font-medium">
          Harga <span className="text-red-600"> *</span>
        </p>
        <label className="input input-bordered input-md flex items-center gap-2">
          Rp
          <input
            type="text"
            className="grow"
            placeholder="1.000.000"
            {...register('price', { required: true, valueAsNumber: true })}
          />
        </label>

        <p className="text-gray-700 font-medium">
          Stock <span className="text-red-600"> *</span>
        </p>
        <input
          className="input input-bordered input-md"
          placeholder="1"
          {...register('stock', { required: true, valueAsNumber: true })}
        />

        <p className="text-gray-700 font-medium">
          Restock Level <span className="text-red-600"> *</span>
        </p>
        <input
          className="input input-bordered input-md"
          placeholder="Masukkan restock level"
          {...register('restockLevel', { required: true, valueAsNumber: true })}
        />

        <button
          disabled={!isDirty}
          className="btn bg-[#01B9DE] hover:bg-sky-400 btn-md mt-4"
          type="submit"
        >
          {mode === 'create' ? 'Tambahkan' : 'Sunting'}
        </button>
      </form>
    </>
  )
}
