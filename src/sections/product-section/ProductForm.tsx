import { useCallback, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { type RouterInput } from '~/server/api/root'
import AddCategoryDialog from './AddCategoryDialog'
import { FaEdit } from 'react-icons/fa'
import ManageComponentDialog from './ManageComponentDialog'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { getDirtyFields } from '~/utils/form'
import BackButton from '~/components/BackButton'

type ProductFormState = RouterInput['product']['add']

interface Props {
  handleCreate?: (data: ProductFormState) => void
  handleEdit?: (data: Partial<ProductFormState>) => void
  defaultValues?: ProductFormState
  mode: 'edit' | 'create'
}

export default function ProductForm({
  handleCreate,
  handleEdit,
  defaultValues,
  mode
}: Props) {
  const { data: session } = useSession()

  const router = useRouter()
  const productId = router.query.id as string

  const addCategoryDialogRef = useRef<HTMLDialogElement>(null)
  const manageComponentDialogRef = useRef<HTMLDialogElement>(null)

  const {
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm<ProductFormState>({
    defaultValues: defaultValues
  })

  const { data } = api.productCategory.get.useQuery({
    page: 0,
    pageSize: 100
  })

  const { data: productComponents } =
    api.productComponent.getByProductId.useQuery(
      {
        productId
      },
      { enabled: !!session?.user && productId ? true : false }
    )

  const onSubmit = useCallback(
    (data: ProductFormState) => {
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
      <BackButton label={`${mode === 'edit' ? 'Edit' : 'Tambah'} Product`} />

      <AddCategoryDialog addCategoryDialogRef={addCategoryDialogRef} />

      {mode === 'edit' && (
        <ManageComponentDialog
          manageComponentDialogRef={manageComponentDialogRef}
        />
      )}

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

        {data && (
          <>
            <div className="flex gap-2 items-center">
              <p>Category</p>
              <span className="text-red-600"> *</span>
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
          <>
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

            {productComponents && (
              <div className="flex flex-col gap-2 mt-2">
                {productComponents.map((item) => (
                  <div
                    className="card shadow-md px-4 py-2 flex flex-row justify-between items-center"
                    key={`${item.productId}_${item.componentId}}`}
                  >
                    <p>{item.component.name}</p>

                    <div className="flex gap-2">
                      <button className="btn btn-circle btn-sm">-</button>
                      <input
                        type="number"
                        className="input input-bordered input-sm w-[100px]"
                        value={item.quantity}
                        onChange={() => {
                          console.log('test')
                        }}
                      />
                      <button className="btn btn-circle btn-sm">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
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
