import { userRouter } from '~/server/api/routers/user'
import { createTRPCRouter } from '~/server/api/trpc'
import { customerRouter } from './routers/customer'
import { departureRouter } from './routers/departure'
import { componentRouter } from './routers/component'
import { productRouter } from './routers/product'
import { productCategoryRouter } from './routers/productCategory'
import { productComponentRouter } from './routers/productComponent'
import { transactionRouter } from './routers/transaction'
import { maritalStatusRouter } from './routers/maritalStatus'
import { educationRouter } from './routers/education'
import { occupationRouter } from './routers/occupation'
import { partnerRouter } from './routers/partner'
import { bankAccountRouter } from './routers/bankAccount'
import { customerBalanceHistoryRouter } from './routers/customerBalanceHistory'
import { employeeRouter } from './routers/employee'
import { paySlipRouter } from './routers/paySlip'
import { logHistoryRouter } from './routers/logHistory'
import { purchaseOrderRouter } from './routers/purchaseOrder'
import { lineItemRouter } from './routers/lineItem'

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
  productComponent: productComponentRouter,
  transaction: transactionRouter,
  maritalStatus: maritalStatusRouter,
  education: educationRouter,
  occupation: occupationRouter,
  partner: partnerRouter,
  bankAccount: bankAccountRouter,
  customerBalanceHistory: customerBalanceHistoryRouter,
  employee: employeeRouter,
  paySlip: paySlipRouter,
  logHistory: logHistoryRouter,
  purchaseOrder: purchaseOrderRouter,
  lineItem: lineItemRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
