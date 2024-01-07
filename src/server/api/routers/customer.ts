import dayjs from 'dayjs'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const customerRouter = createTRPCRouter({
  getCustomers: protectedProcedure
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

  createCustomer: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        age: z.number(),
        gender: z.enum(['MALE', 'FEMALE'])
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.customer.create({
        data: input
      })
    ),

  deleteCustomer: protectedProcedure
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

  getCustomer: protectedProcedure
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

  updateCustomer: protectedProcedure
    .input(
      z
        .object({
          name: z.string(),
          email: z.string(),
          phoneNumber: z.string(),
          address: z.string(),
          age: z.number(),
          gender: z.enum(['MALE', 'FEMALE'])
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
