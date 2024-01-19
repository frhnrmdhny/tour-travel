import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const productCategoryRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [productCategories, totalProductCategories] =
        await ctx.db.$transaction([
          ctx.db.productCategory.findMany({
            take: pageSize,
            skip: page * pageSize
          }),
          ctx.db.productCategory.count()
        ])

      return {
        productCategories,
        pagination: {
          page,
          pageSize,
          rowCount: totalProductCategories
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.productCategory.create({
        data: input
      })
    )

  //   delete: protectedProcedure
  //     .input(
  //       z.object({
  //         id: z.string()
  //       })
  //     )
  //     .mutation(({ ctx, input: { id } }) =>
  //       ctx.db.productCategory.delete({
  //         where: {
  //           id
  //         }
  //       })
  //     ),

  //   getById: protectedProcedure
  //     .input(
  //       z.object({
  //         id: z.string()
  //       })
  //     )
  //     .query(({ ctx, input: { id } }) =>
  //       ctx.db.productCategory.findUnique({
  //         where: {
  //           id
  //         }
  //       })
  //     ),

  //   update: protectedProcedure
  //     .input(
  //       z
  //         .object({
  //           name: z.string()
  //         })
  //         .partial()
  //         .merge(
  //           z.object({
  //             id: z.string()
  //           })
  //         )
  //     )
  //     .mutation(({ ctx, input: { id, ...data } }) =>
  //       ctx.db.productCategory.update({
  //         data,
  //         where: {
  //           id
  //         }
  //       })
  //     )
})
