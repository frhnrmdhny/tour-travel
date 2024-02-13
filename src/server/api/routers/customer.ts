import dayjs from 'dayjs'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const customerRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [customers, totalCustomers] = await ctx.db.$transaction([
        ctx.db.customer.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.customer.count()
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
        name_vaccine: z.string(),
        name_passport: z.string(),
        passport_number: z.string(),
        passport_issued_date: z.date(),
        passport_city: z.string(),
        father_name: z.string(),
        identity_type: z.enum(['NIK', 'KITAS', 'KITAP', 'PASPOR']),
        identity_number: z.string(),
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
        occupationId: z.string()
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
          name_vaccine: z.string(),
          name_passport: z.string(),
          passport_number: z.string(),
          passport_issued_date: z.date(),
          passport_city: z.string(),
          father_name: z.string(),
          identity_type: z.enum(['NIK', 'KITAS', 'KITAP', 'PASPOR']),
          identity_number: z.string(),
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
          occupationId: z.string()
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
  })
})
