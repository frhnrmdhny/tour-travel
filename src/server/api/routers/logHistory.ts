import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const logHistoryRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [logHistory, totaLogHistory] = await ctx.db.$transaction([
        ctx.db.logHistory.findMany({
          take: pageSize,
          skip: page * pageSize,
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
          rowCount: totaLogHistory
        }
      }
    })
})
