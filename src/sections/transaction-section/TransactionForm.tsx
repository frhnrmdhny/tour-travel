import { useForm } from 'react-hook-form'
import { type RouterInput } from '~/server/api/root'
import { api } from '~/utils/api'

type TransactionFormState = RouterInput['transaction']['add']

interface Props {
  handleSubmitCallback: (data: TransactionFormState) => void
  defaultValues?: TransactionFormState
  mode: 'edit' | 'create'
}

export default function TransactionForm({
  handleSubmitCallback,
  defaultValues,
  mode
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isDirty }
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

  if (!customersData || !departuresData || !productsData) return null

  const { customers } = customersData
  const { departures } = departuresData
  const { products } = productsData

  return (
    <form
      onSubmit={handleSubmit(handleSubmitCallback)}
      className="flex flex-col gap-2"
    >
      <p>Customer</p>
      <select
        {...register('customerId', { required: true })}
        className="select select-bordered select-sm"
      >
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
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
        disabled={mode === 'edit' ? !isDirty : false}
        className="btn btn-primary btn-sm mt-4"
        type="submit"
      >
        {mode === 'create' ? 'Tambahkan' : 'Sunting'}
      </button>
    </form>
  )
}
