import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const customerBalanceHistoryRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [customerBalanceHistories, totalCustomerBalanceHistories] =
        await ctx.db.$transaction([
          ctx.db.customerBalanceHistory.findMany({
            take: pageSize,
            skip: page * pageSize
          }),
          ctx.db.customerBalanceHistory.count()
        ])

      return {
        customerBalanceHistories,
        pagination: {
          page,
          pageSize,
          rowCount: totalCustomerBalanceHistories
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        type: z.enum(['DEPOSIT', 'WITHDRAW', 'TRANSACTION']),
        amount: z.number(),
        customerId: z.string(),
        description: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const balance =
        (
          await ctx.db.customerBalanceHistory.aggregate({
            _sum: {
              amount: true
            }
          })
        )._sum.amount ?? 0

      const { type, amount } = input

      if (type === 'WITHDRAW' && amount > balance)
        throw Error('Not enough balance')

      return ctx.db.customerBalanceHistory.create({
        data: {
          ...input,
          amount: type === 'WITHDRAW' ? amount * -1 : amount
        }
      })
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.customerBalanceHistory.delete({
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
      ctx.db.customerBalanceHistory.findUnique({
        where: {
          id
        }
      })
    ),

  update: protectedProcedure
    .input(
      z
        .object({
          type: z.enum(['DEPOSIT', 'WITHDRAW', 'TRANSACTION']),
          amount: z.number(),
          customerId: z.string(),
          description: z.string()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.customerBalanceHistory.update({
        data,
        where: {
          id
        }
      })
    ),

  getByCustomerId: protectedProcedure
    .input(
      z.object({
        customerId: z.string()
      })
    )
    .query(async ({ ctx, input: { customerId } }) => {
      const [customerBalanceHistories, balance] = await ctx.db.$transaction([
        ctx.db.customerBalanceHistory.findMany({
          where: {
            customerId
          }
        }),
        ctx.db.customerBalanceHistory.aggregate({
          _sum: {
            amount: true
          }
        })
      ])

      return {
        customerBalanceHistories,
        balance: balance._sum.amount ?? 0
      }
    })
})
