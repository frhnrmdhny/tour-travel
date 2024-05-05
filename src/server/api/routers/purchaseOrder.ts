import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const purchaseOrderRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
        orderBy: z
          .union([
            z.array(z.record(z.string(), z.unknown())),
            z.record(z.string(), z.unknown())
          ])
          .optional(),
        where: z.record(z.string(), z.unknown()).optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page, orderBy, where } = input

      const [purchaseOrders, totalPurchaseOrders] = await ctx.db.$transaction([
        ctx.db.purchaseOrder.findMany({
          take: pageSize,
          skip: page * pageSize,
          orderBy,
          where
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
        total: z.number(),
        status: z.enum(['NEW', 'APPROVED', 'IN_PROGRESS', 'COMPLETED']),
        completedDate: z.date().optional().nullable()
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
          total: z.number(),
          status: z.enum(['NEW', 'APPROVED', 'IN_PROGRESS', 'COMPLETED']),
          completedDate: z.date().optional().nullable()
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
    ),

  setStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['NEW', 'APPROVED', 'IN_PROGRESS', 'COMPLETED']),
        completedDate: z.date()
      })
    )
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      const { status, completedDate } = data

      const purchaseOrder = await ctx.db.purchaseOrder.update({
        data: {
          status,
          completedDate: status === 'COMPLETED' ? completedDate : undefined
        },
        where: {
          id
        },
        include: {
          LineItem: true
        }
      })

      if (status === 'COMPLETED') {
        await Promise.all(
          purchaseOrder.LineItem.map((item) =>
            ctx.db.component.update({
              where: {
                id: item.ComponentId
              },
              data: {
                stock: {
                  increment: item.quantity
                },
                price: item.price
              }
            })
          )
        )
      }

      return purchaseOrder
    }),

  report: protectedProcedure
    .input(
      z.object({
        from: z.date().optional(),
        to: z.date().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const [total, purchaseOrders] = await Promise.all([
        ctx.db.purchaseOrder.aggregate({
          _sum: {
            total: true
          },
          where: {
            createdAt: {
              gte: input.from,
              lte: input.to
            },
            status: 'COMPLETED'
          }
        }),
        ctx.db.purchaseOrder.findMany({
          where: {
            createdAt: {
              gte: input.from,
              lte: input.to
            },
            status: 'COMPLETED'
          }
        })
      ])

      return {
        totalExpenses: total._sum.total ?? 0,
        purchaseOrders
      }
    })
})
