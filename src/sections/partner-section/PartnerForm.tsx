import { useCallback, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'
import AddBankAccountDialog from './AddBankAccountDialog'
import AccountDetail from './AccountDetail'

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
      <AddBankAccountDialog addBankAccountDialogRef={addBankAccountDialogRef} />

      <div className="grid grid-cols-3 gap-4">
        <div className={`${mode === 'edit' ? 'col-span-2' : 'col-span-3'}`}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <p>Nama</p>
            <input
              className="input input-bordered input-sm"
              {...register('name', { required: true })}
            />

            <p>NIK</p>
            <input
              className="input input-bordered input-sm"
              {...register('identityNumber', { required: true })}
            />

            <p>Email</p>
            <input
              className="input input-bordered input-sm"
              {...register('email', { required: true })}
            />

            <p>Alamat</p>
            <textarea
              className="textarea textarea-bordered textarea-sm"
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
