import { userRouter } from '~/server/api/routers/user'
import { createTRPCRouter } from '~/server/api/trpc'
import { customerRouter } from './routers/customer'
import { departureRouter } from './routers/departure'
import { componentRouter } from './routers/component'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  customer: customerRouter,
  departure: departureRouter,
  component: componentRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
