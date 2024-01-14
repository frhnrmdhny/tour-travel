import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const componentRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [components, totalComponents] = await ctx.db.$transaction([
        ctx.db.component.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.component.count()
      ])

      return {
        components,
        pagination: {
          page,
          pageSize,
          rowCount: totalComponents
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
        restockLevel: z.number()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.component.create({
        data: input
      })
    ),

  deleteComponent: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.component.delete({
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
      ctx.db.component.findUnique({
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
          restockLevel: z.number()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.component.update({
        data,
        where: {
          id
        }
      })
    )
})
