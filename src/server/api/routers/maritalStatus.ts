import { createTRPCRouter, protectedProcedure } from '../trpc'

export const maritalStatusRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => ctx.db.maritalStatus.findMany())
})
