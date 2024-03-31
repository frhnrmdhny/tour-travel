import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const lineItemRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [lineItems, totalLineItems] = await ctx.db.$transaction([
        ctx.db.lineItem.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.lineItem.count()
      ])

      return {
        lineItems,
        pagination: {
          page,
          pageSize,
          rowCount: totalLineItems
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        purchaseOrderId: z.string(),
        ComponentId: z.string(),
        quantity: z.number(),
        price: z.number(),
        total: z.number()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.$transaction(async (tx) => {
        const lineItem = await tx.lineItem.create({
          data: input
        })

        const totalPurchaseOrder = await tx.lineItem.aggregate({
          where: {
            purchaseOrderId: lineItem.purchaseOrderId
          },
          _sum: {
            total: true
          }
        })

        await tx.purchaseOrder.update({
          data: {
            total: totalPurchaseOrder._sum.total ?? 0
          },
          where: {
            id: lineItem.purchaseOrderId
          }
        })

        return lineItem
      })
    ),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.$transaction(async (tx) => {
        const lineItem = await tx.lineItem.delete({
          where: {
            id
          }
        })

        const totalPurchaseOrder = await tx.lineItem.aggregate({
          where: {
            purchaseOrderId: lineItem.purchaseOrderId
          },
          _sum: {
            total: true
          }
        })

        await tx.purchaseOrder.update({
          data: {
            total: totalPurchaseOrder._sum.total ?? 0
          },
          where: {
            id: lineItem.purchaseOrderId
          }
        })

        return lineItem
      })
    ),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ ctx, input: { id } }) =>
      ctx.db.lineItem.findUnique({
        where: {
          id
        }
      })
    ),

  update: protectedProcedure
    .input(
      z
        .object({
          purchaseOrderId: z.string(),
          ComponentId: z.string(),
          quantity: z.number(),
          price: z.number(),
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
      ctx.db.$transaction(async (tx) => {
        const currentLineItem = await tx.lineItem.findUnique({
          where: {
            id
          }
        })

        let currentTotal = currentLineItem?.total ?? 0

        if (currentLineItem) {
          const { price, quantity } = data
          if (price) currentTotal = price * currentLineItem.quantity
          if (quantity) currentTotal = quantity * currentLineItem.price
          if (price && quantity) currentTotal = price * quantity
        }

        const lineItem = await tx.lineItem.update({
          data: {
            ...data,
            total: currentTotal
          },
          where: {
            id
          }
        })

        const totalPurchaseOrder = await tx.lineItem.aggregate({
          where: {
            purchaseOrderId: lineItem.purchaseOrderId
          },
          _sum: {
            total: true
          }
        })

        await tx.purchaseOrder.update({
          data: {
            total: totalPurchaseOrder._sum.total ?? 0
          },
          where: {
            id: lineItem.purchaseOrderId
          }
        })

        return lineItem
      })
    ),

  getByPurchaseOrder: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
        purchaseOrderId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page, purchaseOrderId } = input

      const [lineItems, totalLineItems] = await ctx.db.$transaction([
        ctx.db.lineItem.findMany({
          take: pageSize,
          skip: page * pageSize,
          where: {
            purchaseOrderId
          },
          include: {
            Component: {
              select: {
                name: true
              }
            }
          }
        }),
        ctx.db.lineItem.count({
          where: {
            purchaseOrderId
          }
        })
      ])

      return {
        lineItems,
        pagination: {
          page,
          pageSize,
          rowCount: totalLineItems
        }
      }
    })
})
