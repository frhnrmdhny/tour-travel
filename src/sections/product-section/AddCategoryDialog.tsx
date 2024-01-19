import { useState, type RefObject } from 'react'
import { api } from '~/utils/api'

interface Props {
  addCategoryDialogRef: RefObject<HTMLDialogElement>
}

export default function AddCategoryDialog({ addCategoryDialogRef }: Props) {
  const [categoryName, setCategoryName] = useState('')

  const { mutateAsync } = api.productCategory.add.useMutation()

  const utils = api.useUtils()

  return (
    <dialog className="modal" ref={addCategoryDialogRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Add Category</h3>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button
              onClick={async () => {
                await mutateAsync({
                  name: categoryName
                })
                void utils.productCategory.get.invalidate()
              }}
              className="btn btn-sm"
            >
              Add
            </button>
            <button className="btn btn-sm btn-warning">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
