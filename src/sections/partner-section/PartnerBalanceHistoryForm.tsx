import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { api } from '~/utils/api'
import { getDirtyFields } from '~/utils/form'

type PartnerBalanceHistoryFormState =
  RouterInput['partnerBalanceHistory']['add']

interface Props {
  handleCreate?: (data: PartnerBalanceHistoryFormState) => void
  handleEdit?: (data: Partial<PartnerBalanceHistoryFormState>) => void
  defaultValues?: Partial<PartnerBalanceHistoryFormState>
  mode: 'edit' | 'create'
  close: () => void
}

export default function PartnerBalanceHistoryForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode,
  close
}: Props) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<PartnerBalanceHistoryFormState>({
    defaultValues: defaultValues
  })

  const onSubmit = useCallback(
    (data: PartnerBalanceHistoryFormState) => {
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

  const partnerId = router.query.id as string

  const { data } = api.bankAccount.getByPartnerId.useQuery(
    {
      partnerId
    },
    {
      enabled: !!partnerId
    }
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <p>Amount</p>
      <input
        className="input input-bordered input-sm"
        {...register('amount', { required: true, valueAsNumber: true })}
      />

      <p>Description</p>
      <textarea
        className="textarea textarea-bordered textarea-sm"
        {...register('description', { required: true })}
        rows={2}
      />

      <p>Bank Account</p>
      {data && (
        <select
          {...register('bankAccountId', { required: true })}
          className="select select-bordered select-sm"
        >
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.bankName} - {item.accountNumber} - {item.ownerName}
            </option>
          ))}
        </select>
      )}

      <button
        disabled={!isDirty}
        className="btn btn-primary btn-sm mt-4"
        type="submit"
      >
        {mode === 'create' ? 'Tambahkan' : 'Sunting'}
      </button>

      <button
        className="btn btn-warning btn-sm"
        onClick={(e) => {
          e.preventDefault()
          close()
        }}
      >
        Cancel
      </button>
    </form>
  )
}
