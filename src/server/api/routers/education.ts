import { createTRPCRouter, protectedProcedure } from '../trpc'

export const educationRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => ctx.db.education.findMany())
})
