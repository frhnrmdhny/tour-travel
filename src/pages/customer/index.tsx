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
  passportIssued_date: 'Tanggal Dikeluarkan Paspor(yyyy-mm-dd)',
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

  const { data, isLoading } = api.customer.get.useQuery(
    {
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
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

        const actualCustomer = {
          ...rest,
          maritalStatus: maritalStatus.name,
          education: education.name,
          occupation: occupation.name,
          passportIssuedDate: dayjs(passportIssuedDate).format('YYYY-MM-DD'),
          birthdate: dayjs(birthdate).format('YYYY-MM-DD')
        }

        return actualCustomer
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
        <div className="mb-2 flex gap-2">
          <button
            onClick={() => void router.push('/customer/create')}
            className="btn btn-primary btn-sm"
          >
            Tambahkan
          </button>

          <button onClick={createXls} className="btn btn-secondary btn-sm">
            Unduh XLSM
          </button>
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
      </>
    </Layout>
  )
}
