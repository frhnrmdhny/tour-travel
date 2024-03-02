import { useRouter } from 'next/router'
import { useCallback, useRef } from 'react'
import { api } from '~/utils/api'
import AddPaySlipDialog from './AddPaySlipDialog'
import { FaTrash } from 'react-icons/fa'

export default function EmployeePayroll() {
  const router = useRouter()
  const employeeId = router.query.id as string
  const generatePayrollDialogRef = useRef<HTMLDialogElement>(null)
  const utils = api.useUtils()
  const { data } = api.paySlip.getByEmployeeId.useQuery(
    {
      employeeId
    },
    {
      enabled: !!employeeId
    }
  )
  const { mutateAsync: deletePayslip } = api.paySlip.delete.useMutation()

  const generatePDF = useCallback(
    async ({
      id,
      grossPay,
      deductions,
      netPay,
      createdAt
    }: {
      id: string
      employeeId: string
      grossPay: number
      deductions: number
      netPay: number
      createdAt: Date
      updatedAt: Date
    }) => {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()
      doc.text(`ID : ${id} - (${createdAt.toLocaleString()})`, 10, 10)
      doc.text(`Gross ${grossPay}`, 10, 20)
      doc.text(`Deduction ${deductions}`, 10, 30)
      doc.text(`Net ${netPay}`, 10, 40)
      doc.save(`Payslip ${employeeId} - ${id}.pdf`)
    },
    [employeeId]
  )

  return (
    <>
      <AddPaySlipDialog addPaySlipDialogRef={generatePayrollDialogRef} />

      <div className="w-full">
        <div className="w-full stats bg-neutral text-neutral-content">
          <div className="stat">
            <div className="stat-title text-base-300">Paycheck</div>
            <div className="stat-actions">
              <button
                className="btn btn-sm"
                onClick={() => generatePayrollDialogRef.current?.showModal()}
              >
                Generate Paycheck
              </button>
            </div>
            <div className="mt-4">
              {data?.map((slip) => (
                <div
                  key={slip.id}
                  className="p-3 bg-base-100 text-base-content flex justify-between items-center rounded-lg"
                >
                  {slip.createdAt.toLocaleDateString()}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => generatePDF(slip)}
                      className="btn btn-ghost btn-sm"
                    >
                      Download
                    </button>
                    <button
                      onClick={() =>
                        void deletePayslip({
                          id: slip.id
                        }).then(() =>
                          utils.paySlip.getByEmployeeId.invalidate({
                            employeeId
                          })
                        )
                      }
                      className="btn btn-circle btn-outline btn-sm btn-error"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
