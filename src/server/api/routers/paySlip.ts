import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const paySlipRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [paySlips, totalPaySlip] = await ctx.db.$transaction([
        ctx.db.paySlip.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.paySlip.count()
      ])

      return {
        paySlips,
        pagination: {
          page,
          pageSize,
          rowCount: totalPaySlip
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
        grossPay: z.number(),
        deductions: z.number(),
        netPay: z.number()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.paySlip.create({
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
      ctx.db.paySlip.delete({
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
      ctx.db.paySlip.findUnique({
        where: {
          id
        }
      })
    ),

  update: protectedProcedure
    .input(
      z
        .object({
          employeeId: z.string(),
          grossPay: z.number(),
          deductions: z.number(),
          netPay: z.number()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.paySlip.update({
        data,
        where: {
          id
        }
      })
    )
})
