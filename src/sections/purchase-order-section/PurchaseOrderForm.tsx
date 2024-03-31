import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'

type PurchaseOrderFormState = RouterInput['purchaseOrder']['add']

interface Props {
  handleCreate?: (data: PurchaseOrderFormState) => void
  handleEdit?: (data: Partial<PurchaseOrderFormState>) => void
  defaultValues?: Partial<PurchaseOrderFormState>
  mode: 'edit' | 'create'
}

export default function PurchaseOrderForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<PurchaseOrderFormState>({
    defaultValues: {
      ...defaultValues
    }
  })

  const onSubmit = useCallback(
    (data: PurchaseOrderFormState) => {
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
    <div className="grid grid-cols-6 gap-4">
      <div className={`${mode === 'edit' ? 'col-span-1' : 'col-span-5'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <p>Nama</p>
          <input
            className="input input-bordered input-sm"
            {...register('name', { required: true })}
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
    </div>
  )
}
