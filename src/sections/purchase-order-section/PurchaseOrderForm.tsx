import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { getDirtyFields } from '~/utils/form'
import PurchaseOrderLineItem from './PurchaseOrderLineItem'
import PurchaseOrderTotal from './PurchaseOrderTotal'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'

type PurchaseOrderFormState = Omit<
  RouterInput['purchaseOrder']['add'],
  'completedDate'
> & {
  completedDate: string | Date | null
}

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
  const router = useRouter()

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

  const { id } = router.query

  const { data } = api.purchaseOrder.getById.useQuery(
    {
      id: id as string
    },
    {
      enabled: !!id
    }
  )

  const { mutate } = api.purchaseOrder.setStatus.useMutation()

  const nextStatus = useMemo(
    () =>
      data?.status === 'NEW'
        ? 'APPROVED'
        : data?.status === 'APPROVED'
          ? 'IN_PROGRESS'
          : 'COMPLETED',
    [data?.status]
  )

  const utils = api.useUtils()

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className={`${mode === 'edit' ? 'col-span-4' : 'col-span-12'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {mode === 'edit' && <PurchaseOrderTotal />}

          {mode === 'edit' && (
            <>
              <p>Status</p>
              <div className="badge badge-info py-4 w-full">{data?.status}</div>
              {data?.status !== 'COMPLETED' && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    mutate(
                      {
                        id: id as string,
                        status: nextStatus,
                        completedDate: new Date()
                      },
                      {
                        onSuccess: () =>
                          void utils.purchaseOrder.getById.invalidate({
                            id: id as string
                          })
                      }
                    )
                  }}
                  className="btn btn-neutral btn-outline btn-sm"
                >
                  Set Status To {nextStatus}
                </button>
              )}
            </>
          )}

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
      {mode === 'edit' && <PurchaseOrderLineItem />}
    </div>
  )
}
