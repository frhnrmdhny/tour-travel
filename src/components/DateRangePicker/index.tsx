import React, { useCallback, useRef, useState } from 'react'

import { type DateRange, DayPicker } from 'react-day-picker'
import { FaCalendar } from 'react-icons/fa'

import 'react-day-picker/dist/style.css'
import { MdClear } from 'react-icons/md'

interface Props {
  onChange: (range: DateRange | undefined) => void
}

export default function DateRangePicker({ onChange }: Props) {
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  const dialogRef = useRef<HTMLDialogElement>(null)

  const update = useCallback(
    (range: DateRange | undefined) => {
      onChange(range)
      setRange(range)
    },
    [onChange]
  )

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="btn flex items-center mb-4 btn-sm"
        >
          <FaCalendar /> Filter
        </button>

        <button
          onClick={() => update(undefined)}
          className="btn flex items-center mb-4 btn-sm"
        >
          <MdClear /> Clear
        </button>
      </div>

      <dialog ref={dialogRef} id="my_modal_1" className="modal">
        <div className="modal-box w-auto">
          <div className="flex w-full justify-center">
            <DayPicker
              id="test"
              mode="range"
              selected={range}
              onSelect={(range) => update(range)}
            />
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
