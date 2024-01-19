import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { type RouterInput } from '~/server/api/root'
import AddCategoryDialog from './AddCategoryDialog'
import { FaEdit } from 'react-icons/fa'
import ManageComponentDialog from './ManageComponentDialog'

type ProductFormState = RouterInput['product']['add']

interface Props {
  handleSubmitCallback: (data: ProductFormState) => void
  defaultValues?: ProductFormState
  mode: 'edit' | 'create'
}

export default function ProductForm({
  handleSubmitCallback,
  defaultValues,
  mode
}: Props) {
  const addCategoryDialogRef = useRef<HTMLDialogElement>(null)
  const manageComponentDialogRef = useRef<HTMLDialogElement>(null)

  const {
    register,
    handleSubmit,
    formState: { isDirty }
  } = useForm<ProductFormState>({
    defaultValues: defaultValues
  })

  const { data } = api.productCategory.get.useQuery({
    page: 0,
    pageSize: 100
  })

  return (
    <>
      <AddCategoryDialog addCategoryDialogRef={addCategoryDialogRef} />

      {mode === 'edit' && (
        <ManageComponentDialog
          manageComponentDialogRef={manageComponentDialogRef}
        />
      )}

      <form
        onSubmit={handleSubmit(handleSubmitCallback)}
        className="flex flex-col gap-2"
      >
        <p>Nama</p>
        <input
          className="input input-bordered input-sm"
          {...register('name', { required: true })}
        />

        <p>Deskripsi</p>
        <input
          className="input input-bordered input-sm"
          {...register('description', { required: true })}
        />

        <p>Harga</p>
        <input
          className="input input-bordered input-sm"
          {...register('price', { required: true, valueAsNumber: true })}
        />

        <p>Stock</p>
        <input
          className="input input-bordered input-sm"
          {...register('stock', { required: true, valueAsNumber: true })}
        />

        <p>Restock Level</p>
        <input
          className="input input-bordered input-sm"
          {...register('restockLevel', { required: true, valueAsNumber: true })}
        />

        {data && (
          <>
            <div className="flex gap-2 items-center">
              <p>Category</p>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  addCategoryDialogRef.current?.showModal()
                }}
                className="btn btn-xs"
              >
                Add Category +
              </button>
            </div>
            <select
              {...register('productCategoryId', { required: true })}
              className="select select-bordered select-sm"
            >
              {data.productCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </>
        )}

        {mode === 'edit' && (
          <div className="flex gap-2 items-center">
            <p>Components</p>
            <button
              onClick={(e) => {
                e.preventDefault()
                manageComponentDialogRef.current?.showModal()
              }}
              className="btn btn-xs"
            >
              Manage Component
              <FaEdit />
            </button>
          </div>
        )}

        <button
          disabled={!isDirty}
          className="btn btn-primary btn-sm mt-4"
          type="submit"
        >
          {mode === 'create' ? 'Tambahkan' : 'Sunting'}
        </button>
      </form>
    </>
  )
}
