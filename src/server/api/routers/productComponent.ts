import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const productComponentRouter = createTRPCRouter({
  addProductComponent: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        componentId: z.string()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.productsComponents.create({
        data: {
          ...input,
          quantity: 1
        }
      })
    ),

  getByProductId: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(({ ctx, input: { productId } }) =>
      ctx.db.productsComponents.findMany({
        where: {
          productId
        },
        include: {
          component: true
        }
      })
    ),

  delete: protectedProcedure
    .input(z.object({ productId: z.string(), componentId: z.string() }))
    .mutation(({ ctx, input: { productId, componentId } }) =>
      ctx.db.productsComponents.delete({
        where: {
          id: {
            productId,
            componentId
          }
        }
      })
    )
})
