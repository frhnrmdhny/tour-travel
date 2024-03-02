import { useRouter } from 'next/router'
import { useCallback, type RefObject, useState, useMemo } from 'react'
import { api } from '~/utils/api'
import { createPortal } from 'react-dom'

interface Props {
  addPaySlipDialogRef: RefObject<HTMLDialogElement>
}

export default function AddPaySlipDialog({ addPaySlipDialogRef }: Props) {
  const router = useRouter()
  const employeeId = router.query.id as string
  const utils = api.useUtils()

  const [deductions, setDeductions] = useState(0)

  const { mutateAsync } = api.paySlip.add.useMutation()

  const { data } = api.employee.getById.useQuery(
    {
      id: employeeId
    },
    {
      enabled: !!employeeId
    }
  )

  const close = useCallback(() => {
    addPaySlipDialogRef.current?.close()
  }, [addPaySlipDialogRef])

  const netPay = useMemo(
    () =>
      typeof deductions === 'number' && data?.salary
        ? data.salary - deductions
        : 0,
    [data?.salary, deductions]
  )

  const generatePayslip = useCallback(async () => {
    if (data) {
      await mutateAsync({
        deductions,
        employeeId,
        netPay: data.salary - deductions,
        grossPay: data.salary
      })
      void utils.employee.getById.invalidate({ id: employeeId })
      void utils.paySlip.getByEmployeeId.invalidate({ employeeId })
      close()
    }
  }, [
    close,
    data,
    deductions,
    employeeId,
    mutateAsync,
    utils.employee.getById,
    utils.paySlip.getByEmployeeId
  ])

  return createPortal(
    <dialog className="modal" ref={addPaySlipDialogRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Generate Paycheck</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Salary</p> <p>{data?.salary}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Deductions</p>{' '}
            <input
              value={deductions}
              onChange={(e) => {
                const newValue = parseInt(e.target.value)
                if (isNaN(newValue)) return
                setDeductions(newValue)
              }}
              type="number"
              className="input input-bordered input-sm"
            />
          </div>
          <div className="flex justify-between">
            <p>Net Pay</p> <p>{netPay}</p>
          </div>
        </div>
        <div className="modal-action">
          <button
            onClick={generatePayslip}
            className="btn btn-primary btn-sm mt-4"
          >
            Generate
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  )
}
