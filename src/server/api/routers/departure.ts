import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const departureRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [departures, totalDepartures] = await ctx.db.$transaction([
        ctx.db.departure.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.departure.count()
      ])

      return {
        departures,
        pagination: {
          page,
          pageSize,
          rowCount: totalDepartures
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        departureDate: z.date(),
        returnDate: z.date(),
        status: z.enum(['PREPARING', 'ONGOING', 'FINISH'])
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.departure.create({
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
      ctx.db.departure.delete({
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
      ctx.db.departure.findUnique({
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
          departureDate: z.date(),
          returnDate: z.date(),
          status: z.enum(['PREPARING', 'ONGOING', 'FINISH'])
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.departure.update({
        data,
        where: {
          id
        }
      })
    )
})
