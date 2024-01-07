import { z } from 'zod'
import {
  createTRPCRouter,
  superAdminProtectedProcedure
} from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
  getUsers: superAdminProtectedProcedure
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
    }),

  toggleVerification: superAdminProtectedProcedure
    .input(
      z.object({
        idUser: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.idUser
        }
      })

      return ctx.db.user.update({
        data: {
          role: user?.role === 'USER' ? 'ADMIN' : 'USER'
        },
        where: {
          id: input.idUser
        }
      })
    })
})
