import { userRouter } from '~/server/api/routers/user'
import { createTRPCRouter } from '~/server/api/trpc'
import { customerRouter } from './routers/customer'
import { departureRouter } from './routers/departure'
import { componentRouter } from './routers/component'
import { productRouter } from './routers/product'
import { productCategoryRouter } from './routers/productCategory'
import { productComponentRouter } from './routers/productComponent'

import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  customer: customerRouter,
  departure: departureRouter,
  component: componentRouter,
  product: productRouter,
  productCategory: productCategoryRouter,
  productComponent: productComponentRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
