import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const logHistoryRouter = createTRPCRouter({
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
      const { pageSize, page, where } = input

      const [logHistory, totalLogHistory] = await ctx.db.$transaction([
        ctx.db.logHistory.findMany({
          take: pageSize,
          skip: page * pageSize,
          where,
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }),
        ctx.db.logHistory.count()
      ])

      return {
        logHistory,
        pagination: {
          page,
          pageSize,
          rowCount: totalLogHistory
        }
      }
    })
})
