import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { api } from '~/utils/api'
import { getDirtyFields } from '~/utils/form'

type TransactionFormState = RouterInput['transaction']['add']

interface Props {
  handleCreate?: (data: TransactionFormState) => void
  handleEdit?: (data: Partial<TransactionFormState>) => void
  defaultValues?: TransactionFormState
  mode: 'edit' | 'create'
}

export default function TransactionForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<TransactionFormState>({
    defaultValues: defaultValues
  })

  const { data: customersData } = api.customer.get.useQuery({
    page: 0,
    pageSize: 100
  })

  const { data: departuresData } = api.departure.get.useQuery({
    page: 0,
    pageSize: 100
  })

  const { data: productsData } = api.product.get.useQuery({
    page: 0,
    pageSize: 100
  })

  const onSubmit = useCallback(
    (data: TransactionFormState) => {
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

  if (!customersData || !departuresData || !productsData) return null

  const { customers } = customersData
  const { departures } = departuresData
  const { products } = productsData

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <p>Customer</p>
      <select
        {...register('customerId', { required: true })}
        className="select select-bordered select-sm"
      >
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.namePassport}
          </option>
        ))}
      </select>

      <p>Keberangkatan</p>
      <select
        {...register('departureId', { required: true })}
        className="select select-bordered select-sm"
      >
        {departures.map((departure) => (
          <option key={departure.id} value={departure.id}>
            {departure.name}
          </option>
        ))}
      </select>

      <p>Product</p>
      <select
        {...register('productId', { required: true })}
        className="select select-bordered select-sm"
      >
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <button
        disabled={!isDirty}
        className="btn btn-primary btn-sm mt-4"
        type="submit"
      >
        {mode === 'create' ? 'Tambahkan' : 'Sunting'}
      </button>
    </form>
  )
}
