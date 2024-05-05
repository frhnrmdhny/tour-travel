import { useCallback, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'
import AddBankAccountDialog from './AddBankAccountDialog'
import AccountDetail from './AccountDetail'
import BackButton from '~/components/BackButton'

type PartnerFormState = RouterInput['partner']['add']

interface Props {
  handleCreate?: (data: PartnerFormState) => void
  handleEdit?: (data: Partial<PartnerFormState>) => void
  defaultValues?: PartnerFormState
  mode: 'edit' | 'create'
}

export default function PartnerForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<PartnerFormState>({
    defaultValues: defaultValues
  })

  const addBankAccountDialogRef = useRef<HTMLDialogElement>(null)

  const onSubmit = useCallback(
    (data: PartnerFormState) => {
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
      <BackButton label={`${mode === 'edit' ? 'Edit' : 'Tambah'} Partner`} />

      <AddBankAccountDialog addBankAccountDialogRef={addBankAccountDialogRef} />

      <div className="grid grid-cols-3 gap-4">
        <div className={`${mode === 'edit' ? 'col-span-2' : 'col-span-3'}`}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <p className="text-gray-700 font-medium ">
              Nama <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan nama mitra"
              {...register('name', { required: true })}
            />

            <p className="text-gray-700 font-medium">
              NIK <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan NIK"
              {...register('identityNumber', { required: true })}
            />

            <p className="text-gray-700 font-medium">
              Email <span className="text-red-600"> *</span>
            </p>
            <input
              className="input input-bordered input-sm"
              placeholder="Masukkan email"
              {...register('email', { required: true })}
            />

            <p className="text-gray-700 font-medium">
              Alamat <span className="text-red-600"> *</span>
            </p>
            <textarea
              className="textarea textarea-bordered textarea-sm"
              placeholder="Masukkan alamat"
              {...register('address', { required: true })}
              rows={2}
            />

            <button
              disabled={!isDirty}
              className="btn btn-primary btn-sm mt-4"
              type="submit"
            >
              {mode === 'create' ? 'Tambahkan' : 'Sunting'}
            </button>
          </form>
        </div>

        {mode === 'edit' && (
          <AccountDetail addBankAccountDialogRef={addBankAccountDialogRef} />
        )}
      </div>
    </>
  )
}
