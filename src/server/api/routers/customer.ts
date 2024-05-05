import { type Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { sortsStringToObject } from '~/utils/parser'
import { validateAttributeFilters } from '~/utils/validator'
import typia from 'typia'

const x = z.object({
  page: z.number(),
  pageSize: z.number()
})

type inputSchema = z.infer<typeof x> & { where?: Prisma.CustomerWhereInput }

export const customerRouter = createTRPCRouter({
  get: protectedProcedure
    .input(typia.createAssert<inputSchema>())
    .query(async ({ ctx, input }) => {
      const { pageSize, page, where } = input

      console.log(where)
      // const sortsObject = sortsStringToObject(sorts)

      const [customers, totalCustomers] = await ctx.db.$transaction([
        ctx.db.customer.findMany({
          take: pageSize,
          skip: page * pageSize,
          // orderBy: sortsObject,
          where,
          include: {
            maritalStatus: {
              select: {
                name: true
              }
            },
            education: {
              select: {
                name: true
              }
            },
            occupation: {
              select: {
                name: true
              }
            }
          }
        }),
        ctx.db.customer.count({
          where
        })
      ])

      return {
        customers,
        pagination: {
          page,
          pageSize,
          rowCount: totalCustomers
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        title: z.enum(['TUAN', 'NONA', 'NYONYA']),
        nameVaccine: z.string(),
        namePassport: z.string(),
        passportNumber: z.string(),
        passportIssuedDate: z.date(),
        passportCity: z.string(),
        fatherName: z.string(),
        identityType: z.enum(['NIK', 'KITAS', 'KITAP', 'PASPOR']),
        identityNumber: z.string(),
        birthplace: z.string(),
        birthdate: z.date(),
        address: z.string(),
        province: z.string(),
        city: z.string(),
        subdistrict: z.string(),
        ward: z.string(),
        phoneNumber: z.string(),
        mobileNumber: z.string(),
        nationality: z.enum(['WNI', 'WNA']),
        maritalStatusId: z.string(),
        educationId: z.string(),
        occupationId: z.string(),
        profilePictureUrl: z.string()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.customer.create({
        data: input
      })
    ),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.customer.delete({
        where: {
          id
        }
      })
    ),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ ctx, input: { id } }) =>
      ctx.db.customer.findUnique({
        where: {
          id
        }
      })
    ),

  update: protectedProcedure
    .input(
      z
        .object({
          title: z.enum(['TUAN', 'NONA', 'NYONYA']),
          nameVaccine: z.string(),
          namePassport: z.string(),
          passportNumber: z.string(),
          passportIssuedDate: z.date(),
          passportCity: z.string(),
          fatherName: z.string(),
          identityType: z.enum(['NIK', 'KITAS', 'KITAP', 'PASPOR']),
          identityNumber: z.string(),
          birthplace: z.string(),
          birthdate: z.date(),
          address: z.string(),
          province: z.string(),
          city: z.string(),
          subdistrict: z.string(),
          ward: z.string(),
          phoneNumber: z.string(),
          mobileNumber: z.string(),
          nationality: z.enum(['WNI', 'WNA']),
          maritalStatusId: z.string(),
          educationId: z.string(),
          occupationId: z.string(),
          profilePictureUrl: z.string()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.customer.update({
        data,
        where: {
          id
        }
      })
    ),

  getDashboardData: protectedProcedure.query(async ({ ctx }) => {
    const thisMonth = [
      dayjs().startOf('month').toDate(),
      dayjs().endOf('month').toDate()
    ]

    const [customerCount, thisMonthCustomerCount] = await ctx.db.$transaction([
      ctx.db.customer.count(),
      ctx.db.customer.count({
        where: {
          createdAt: {
            gte: thisMonth[0],
            lte: thisMonth[1]
          }
        }
      })
    ])

    const totalCustomerLastMonth = customerCount - thisMonthCustomerCount

    const customerGrowth =
      (thisMonthCustomerCount / totalCustomerLastMonth) * 100

    return {
      customerCount,
      customerGrowth,
      thisMonthCustomerCount
    }
  }),

  getDashboardDataWithFilter: protectedProcedure
    .input(
      z.object({
        from: z.date().optional(),
        to: z.date().optional()
      })
    )
    .query(async ({ ctx, input }) =>
      ctx.db.customer.count({
        where: {
          createdAt: {
            gte: input.from,
            lte: input.to
          }
        }
      })
    ),

  getAdditionalInformation: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ ctx, input: { id } }) =>
      ctx.db.customer.findUnique({
        where: {
          id
        },
        select: {
          id: true,
          balanceHistory: true
        }
      })
    )
})
