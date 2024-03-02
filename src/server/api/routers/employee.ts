import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const employeeRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      const { pageSize, page } = input

      const [employees, totalEmployees] = await ctx.db.$transaction([
        ctx.db.employee.findMany({
          take: pageSize,
          skip: page * pageSize
        }),
        ctx.db.employee.count()
      ])

      return {
        employees,
        pagination: {
          page,
          pageSize,
          rowCount: totalEmployees
        }
      }
    }),

  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        title: z.string(),
        email: z.string(),
        description: z.string(),
        salary: z.number(),
        bankAccount: z.string(),
        managerId: z.string().optional().nullable()
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.db.employee.create({
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
      ctx.db.employee.delete({
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
      ctx.db.employee.findUnique({
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
          title: z.string(),
          email: z.string(),
          description: z.string(),
          salary: z.number(),
          bankAccount: z.string(),
          managerId: z.string().optional().nullable()
        })
        .partial()
        .merge(
          z.object({
            id: z.string()
          })
        )
    )
    .mutation(({ ctx, input: { id, ...data } }) =>
      ctx.db.employee.update({
        data,
        where: {
          id
        }
      })
    )
})
