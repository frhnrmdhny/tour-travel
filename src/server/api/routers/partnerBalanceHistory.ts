import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const partnerBalanceHistoryRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [partnerBalanceHistories, totalPartnerBalanceHistories] =
        await ctx.db.$transaction([
          ctx.db.partnerBalanceHistory.findMany({
            take: pageSize,
            skip: page * pageSize
          }),
          ctx.db.partnerBalanceHistory.count()
        ])

      return {
        partnerBalanceHistories,
        pagination: {
          page,
          pageSize,
          rowCount: totalPartnerBalanceHistories
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        type: z.enum(['DEPOSIT', 'WITHDRAW', 'TRANSACTION']),
        amount: z.number(),
        partnerId: z.string(),
        description: z.string(),
        bankAccountId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { type, partnerId, amount } = input

      const partner = await ctx.db.partner.findUnique({
        where: {
          id: partnerId
        }
      })

      if (type === 'WITHDRAW') {
        if (partner && partner.balance < amount)
          throw Error('Not enough balance')

        const [, partnerBalanceHistory] = await ctx.db.$transaction([
          ctx.db.partner.update({
            where: {
              id: partnerId
            },
            data: {
              balance: {
                decrement: amount
              }
            }
          }),
          ctx.db.partnerBalanceHistory.create({
            data: {
              ...input,
              amount: type === 'WITHDRAW' ? amount * -1 : amount
            }
          })
        ])
        return partnerBalanceHistory
      } else {
        throw Error('Not supported')
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.partnerBalanceHistory.delete({
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
      ctx.db.partnerBalanceHistory.findUnique({
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
          partnerId: z.string(),
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
      ctx.db.partnerBalanceHistory.update({
        data,
        where: {
          id
        }
      })
    ),

  getByPartnerId: protectedProcedure
    .input(
      z.object({
        partnerId: z.string(),
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page, partnerId } = input

      const [partnerBalanceHistories, totalPartnerBalanceHistories] =
        await ctx.db.$transaction([
          ctx.db.partnerBalanceHistory.findMany({
            take: pageSize,
            skip: page * pageSize,
            where: {
              partnerId
            }
          }),
          ctx.db.partnerBalanceHistory.count()
        ])

      return {
        partnerBalanceHistories,
        pagination: {
          page,
          pageSize,
          rowCount: totalPartnerBalanceHistories,
          pageCount:
            totalPartnerBalanceHistories && pageSize
              ? Math.ceil(totalPartnerBalanceHistories / pageSize)
              : 0
        }
      }
    })
})
