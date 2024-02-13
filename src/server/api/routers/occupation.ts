import { createTRPCRouter, protectedProcedure } from '../trpc'

export const occupationRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => ctx.db.occupation.findMany())
})
