import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
  getUsers: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [users, totalUsers] = await ctx.db.$transaction([
        ctx.db.user.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.user.count()
      ])

      return {
        users,
        pagination: {
          page,
          pageSize,
          rowCount: totalUsers
        }
      }
    })
})
