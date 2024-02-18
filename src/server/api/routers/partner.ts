import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const partnerRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [partners, totalPartners] = await ctx.db.$transaction([
        ctx.db.partner.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.partner.count()
      ])

      return {
        partners,
        pagination: {
          page,
          pageSize,
          rowCount: totalPartners
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        address: z.string(),
        identityNumber: z.string()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.partner.create({
        data: {
          ...input,
          balance: 0
        }
      })
    ),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.partner.delete({
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
      ctx.db.partner.findUnique({
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
          email: z.string(),
          address: z.string(),
          identityNumber: z.string()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.partner.update({
        data,
        where: {
          id
        }
      })
    )
})
