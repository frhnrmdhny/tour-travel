import { type RouterOutput } from '~/server/api/root'

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

export const createXls = async (data: RouterOutput['customer']['get']) => {
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
