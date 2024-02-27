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
  const created = await Promise.all(
    OCCUPATION_DATA.map((data) =>
      prisma.occupation.upsert({
        where: {
          name: data
        },
        update: {},
        create: {
          name: data
        }
      })
    )
  )

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
  const created = await Promise.all(
    EDUCATION_DATA.map((data) =>
      prisma.education.upsert({
        where: {
          name: data
        },
        update: {},
        create: {
          name: data
        }
      })
    )
  )

  console.log(created, 'education')
}

const MARITAL_STATUS_DATA = ['BELUM MENIKAH', 'MENIKAH', 'JANDA / DUDA']

async function seedMaritalStatus() {
  const created = await Promise.all(
    MARITAL_STATUS_DATA.map((data) =>
      prisma.maritalStatus.upsert({
        where: {
          name: data
        },
        update: {},
        create: {
          name: data
        }
      })
    )
  )

  console.log(created, 'maritalStatus')
}

async function main() {
  await Promise.all([seedOccupation(), seedEducation(), seedMaritalStatus()])
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
