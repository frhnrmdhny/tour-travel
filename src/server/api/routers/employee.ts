import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const employeeRouter = createTRPCRouter({
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
      const { pageSize, page, orderBy, where } = input

      const [employees, totalEmployees] = await ctx.db.$transaction([
        ctx.db.employee.findMany({
          take: pageSize,
          skip: page * pageSize,
          orderBy,
          where
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
    ),

  report: protectedProcedure
    .input(
      z.object({
        from: z.date().optional(),
        to: z.date().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const [total, paySlips] = await Promise.all([
        ctx.db.paySlip.aggregate({
          _sum: {
            grossPay: true
          },
          where: {
            createdAt: {
              gte: input.from,
              lte: input.to
            }
          }
        }),
        ctx.db.paySlip.findMany({
          where: {
            createdAt: {
              gte: input.from,
              lte: input.to
            }
          },
          include: {
            Employee: true
          }
        })
      ])

      return {
        totalExpenses: total._sum.grossPay ?? 0,
        paySlips
      }
    })
})
