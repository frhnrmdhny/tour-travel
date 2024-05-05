import { z } from 'zod'
import {
  createTRPCRouter,
  superAdminProtectedProcedure
} from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
  get: superAdminProtectedProcedure
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
      const { pageSize, page, orderBy, where } = input

      const [users, totalUsers] = await ctx.db.$transaction([
        ctx.db.user.findMany({
          take: pageSize,
          skip: page * pageSize,
          orderBy,
          where
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
