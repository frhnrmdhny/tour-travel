import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const purchaseOrderRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [purchaseOrders, totalPurchaseOrders] = await ctx.db.$transaction([
        ctx.db.purchaseOrder.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.purchaseOrder.count()
      ])

      return {
        purchaseOrders,
        pagination: {
          page,
          pageSize,
          rowCount: totalPurchaseOrders
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        total: z.number()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.purchaseOrder.create({
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
      ctx.db.purchaseOrder.delete({
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
      ctx.db.purchaseOrder.findUnique({
        where: {
          id
        }
      })
    ),

  update: protectedProcedure
    .input(
      z
        .object({
          name: z.string(),
          total: z.number()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.purchaseOrder.update({
        data,
        where: {
          id
        }
      })
    )
})
