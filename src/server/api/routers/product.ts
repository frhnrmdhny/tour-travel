import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const productRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [products, totalProducts] = await ctx.db.$transaction([
        ctx.db.product.findMany({
          take: pageSize,
          skip: page * pageSize,
          include: {
            productCategory: {
              select: {
                name: true
              }
            }
          }
        }),
        ctx.db.product.count()
      ])

      return {
        products,
        pagination: {
          page,
          pageSize,
          rowCount: totalProducts
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        stock: z.number(),
        restockLevel: z.number(),
        productCategoryId: z.string()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.product.create({
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
      ctx.db.product.delete({
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
      ctx.db.product.findUnique({
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
          description: z.string(),
          price: z.number(),
          stock: z.number(),
          restockLevel: z.number(),
          productCategoryId: z.string()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.product.update({
        data,
        where: {
          id
        }
      })
    )
})
