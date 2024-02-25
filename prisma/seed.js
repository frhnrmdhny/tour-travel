import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const OCCUPATION_DATA = [
  'PNS',
  'PEG. SWASTA',
  'WIRAUSAHA',
  'TNI / POLRI',
  'PETANI',
  'NELAYAN',
  'LAINNYA',
  'TIDAK BEKERJA'
]

async function seedOccupation() {
  const occupationInDatabase = (await prisma.occupation.findMany()).map(
    (occupation) => occupation.name
  )
  const notExistOccupation = OCCUPATION_DATA.filter(
    (occupation) => !occupationInDatabase.includes(occupation)
  )
  const created = await prisma.occupation.createMany({
    data: notExistOccupation.map((occupation) => ({
      name: occupation
    }))
  })
  console.log(created, 'occupation')
}

const EDUCATION_DATA = [
  'TIDAK SEKOLAH',
  'SD/MI',
  'SMP/MTS',
  'SMA/MA',
  'D1',
  'D2',
  'D3',
  'D4/S1',
  'S2',
  'S3'
]

async function seedEducation() {
  const educationInDatabase = (await prisma.education.findMany()).map(
    (education) => education.name
  )
  const notExistEducation = EDUCATION_DATA.filter(
    (education) => !educationInDatabase.includes(education)
  )
  const created = await prisma.education.createMany({
    data: notExistEducation.map((education) => ({
      name: education
    }))
  })
  console.log(created, 'education')
}

const MARITAL_STATUS_DATA = ['BELUM MENIKAH', 'MENIKAH', 'JANDA / DUDA']

async function seedMaritalStatus() {
  const maritalStatusInDatabase = (await prisma.maritalStatus.findMany()).map(
    (maritalStatus) => maritalStatus.name
  )
  const notExistMaritalStatus = MARITAL_STATUS_DATA.filter(
    (maritalStatus) => !maritalStatusInDatabase.includes(maritalStatus)
  )
  const created = await prisma.maritalStatus.createMany({
    data: notExistMaritalStatus.map((maritalStatus) => ({
      name: maritalStatus
    }))
  })
  console.log(created, 'maritalStatus')
}

async function main() {
  await seedOccupation()
  await seedEducation()
  await seedMaritalStatus()
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
