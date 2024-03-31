import { useCallback, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import ComponentsTable from './ComponentsTable'

interface Props {
  addLineItemDialogRef: RefObject<HTMLDialogElement>
}

export default function AddLineItemDialog({ addLineItemDialogRef }: Props) {
  const close = useCallback(() => {
    addLineItemDialogRef.current?.close()
  }, [addLineItemDialogRef])

  if (typeof window === 'object') {
    return createPortal(
      <dialog className="modal" ref={addLineItemDialogRef}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add Line Item</h3>
          <div className="modal-action">
            <ComponentsTable />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-warning btn-sm"
              onClick={(e) => {
                e.preventDefault()
                close()
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>,
      document.body
    )
  }

  return null
}
