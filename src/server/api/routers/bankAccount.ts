import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const bankAccountRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [bankAccounts, totalBankAccounts] = await ctx.db.$transaction([
        ctx.db.bankAccount.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.bankAccount.count()
      ])

      return {
        bankAccounts,
        pagination: {
          page,
          pageSize,
          rowCount: totalBankAccounts
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        bankName: z.string(),
        ownerName: z.string(),
        accountNumber: z.string()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.bankAccount.create({
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
      ctx.db.bankAccount.delete({
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
      ctx.db.bankAccount.findUnique({
        where: {
          id
        }
      })
    ),

  update: protectedProcedure
    .input(
      z
        .object({
          bankName: z.string(),
          ownerName: z.string(),
          accountNumber: z.string()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.bankAccount.update({
        data,
        where: {
          id
        }
      })
    )
})
