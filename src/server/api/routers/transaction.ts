import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const transactionRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [transactions, totalTransactions] = await ctx.db.$transaction([
        ctx.db.transaction.findMany({
          take: pageSize,
          skip: page * pageSize,
          include: {
            customer: {
              select: {
                name: true
              }
            },
            departure: {
              select: {
                name: true
              }
            },
            product: {
              select: {
                name: true
              }
            }
          }
        }),
        ctx.db.transaction.count()
      ])

      return {
        transactions,
        pagination: {
          page,
          pageSize,
          rowCount: totalTransactions
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        customerId: z.string(),
        departureId: z.string(),
        productId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productId } = input

      await ctx.db.product.update({
        where: {
          id: productId
        },
        data: {
          stock: {
            decrement: 1
          }
        },
        include: {
          components: {
            select: {
              id: true
            }
          }
        }
      })

      const productComponents = await ctx.db.productsComponents.findMany({
        where: {
          productId
        }
      })

      await Promise.all(
        productComponents.map((productComponent) =>
          ctx.db.component.update({
            where: {
              id: productComponent.componentId
            },
            data: {
              stock: {
                decrement: productComponent.quantity
              }
            }
          })
        )
      )

      return ctx.db.transaction.create({
        data: input
      })
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.transaction.delete({
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
      ctx.db.transaction.findUnique({
        where: {
          id
        }
      })
    ),

  update: protectedProcedure
    .input(
      z
        .object({
          status: z.enum(['NEW', 'IN_PROCESS', 'SETTLE', 'CANCEL']),
          customerId: z.string(),
          departureId: z.string(),
          productId: z.string()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.transaction.update({
        data,
        where: {
          id
        }
      })
    )
})
