import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import usePagination from '~/hooks/usePagination'
import { type RouterOutput } from '~/server/api/root'

type CustomerGetOutput = RouterOutput['customer']['get']

const TABLE_HEAD_LABEL = {
  title: 'Title',
  nameVaccine: 'Nama (Sesuai Dengan nama Pada Kartu Vaksin)',
  fatherName: 'Nama Ayah',
  identityType: 'Jenis Identitas',
  identityNumber: 'No Identitas',
  namePassport: 'Nama Paspor',
  passportNumber: 'No Paspor',
  passportIssuedDate: 'Tanggal Dikeluarkan Paspor(yyyy-mm-dd)',
  passportCity: 'Kota Paspor',
  birthplace: 'Tempat Lahir',
  birthdate: 'Tanggal Lahir(yyyy-mm-dd)',
  address: 'Alamat',
  province: 'Provinsi',
  city: 'Kabupaten',
  subdistrict: 'Kecamatan',
  ward: 'Kelurahan',
  phoneNumber: 'No. Telepon',
  mobileNumber: 'No Hp',
  nationality: 'KewargaNegaraan',
  maritalStatus: 'Status Pernikahan',
  education: 'Pendidikan',
  occupation: 'Pekerjaan'
} as Record<string, string>

export default function Customer() {
  const router = useRouter()
  const { data: session } = useSession()

  const [paginationModel, setPaginationModel] = usePagination()
  const dateGte = new Date('2024-02-01')
  const dateLte = new Date('2024-03-03')

  const { data, isLoading } = api.customer.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sorts: 'namePassport',
      filters: {
        passportIssuedDate: {
          lt: dateLte.toISOString(),
          gt: dateGte.toISOString()
        }
      }
    },
    { enabled: !!session?.user }
  )

  const { mutate } = api.customer.delete.useMutation()

  const utils = api.useUtils()

  const columns = useMemo(
    () =>
      [
        {
          field: 'title',
          headerName: 'Title',
          flex: 1
        },
        { field: 'namePassport', headerName: 'Nama', flex: 1 },
        { field: 'address', headerName: 'Alamat', flex: 1 },
        { field: 'action', headerName: 'Action', flex: 1 },

        {
          field: 'id',
          headerName: '',
          width: 200,
          renderCell: (params) => {
            const { id } = params.row

            return (
              <span className="flex flex-row gap-2">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() =>
                    mutate(
                      {
                        id
                      },
                      {
                        onSuccess: () => void utils.customer.get.invalidate()
                      }
                    )
                  }
                >
                  Hapus
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => router.push(`/customer/${id}/edit`)}
                >
                  Sunting
                </button>
              </span>
            )
          }
        }
      ] satisfies GridColDef<CustomerGetOutput['customers'][0]>[],
    [mutate, router, utils.customer.get]
  )

  const createXls = async () => {
    if (data) {
      const dayjs = (await import('dayjs')).default
      const xlsx = await import('xlsx')

      const customers = data.customers.map((customer) => {
        const {
          id,
          passportIssuedDate,
          birthdate,
          maritalStatusId,
          maritalStatus,
          educationId,
          education,
          occupationId,
          occupation,
          createdAt,
          updatedAt,
          ...rest
        } = customer

        const actualCustomer: Record<string, string> = {
          ...rest,
          maritalStatus: maritalStatus.name,
          education: education.name,
          occupation: occupation.name,
          passportIssuedDate: dayjs(passportIssuedDate).format('YYYY-MM-DD'),
          birthdate: dayjs(birthdate).format('YYYY-MM-DD')
        }

        const sortedCustomer: Record<string, string> = {}

        Object.keys(TABLE_HEAD_LABEL).forEach((key) => {
          const value = actualCustomer[key]
          if (value) sortedCustomer[key] = value
        })

        return sortedCustomer
      })

      const worksheet = xlsx.utils.json_to_sheet(customers)
      const sheetData = xlsx.utils.sheet_to_json(worksheet, {
        header: 1
      })
      const header = sheetData[0] as string[]
      const actualHeader = header.map((head) => TABLE_HEAD_LABEL[head])
      xlsx.utils.sheet_add_aoa(worksheet, [actualHeader], { origin: 'A1' })
      const workbook = xlsx.utils.book_new()
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      xlsx.writeFile(workbook, `data-customer-${Date.now()}.xlsm`, {
        compression: true
      })
    }
  }

  return (
    <Layout>
      <>
        <div className="mb-2">
          <h1 className="font-bold text-gray-800">Customer</h1>
          <h3 className="text-sm text-slate-500">Pages / Customer</h3>
        </div>
        <div className="mb-2 flex gap-2 justify-between">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Cari customer ..."
            />
          </label>
          <div className="gap-2 flex">
            <button
              onClick={() => void router.push('/customer/create')}
              className="btn btn-md rounded-full bg-[#01B9DE] hover:bg-sky-600 text-white"
            >
              + Tambah Customer
            </button>

            <button
              onClick={createXls}
              className="btn bg-[#01B9DE] hover:bg-sky-600 btn-md rounded-full text-white"
            >
              Unduh XLSM
            </button>
          </div>
        </div>

        <DataGrid
          rows={data?.customers ?? []}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          rowCount={data?.pagination.rowCount ?? 0}
          rowSelection={false}
        />
        <div className="">
          <button className="btn btn-outline btn-sm"> Previous </button>
          <button className="btn btn-outline btn-sm"> Next </button>
        </div>
      </>
    </Layout>
  )
}
