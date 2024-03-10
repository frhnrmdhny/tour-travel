import { type Prisma, type PrismaClient } from '@prisma/client'
import { type DefaultArgs } from '@prisma/client/runtime/library'
import { type Session } from 'next-auth'

export const logger = async (
  ctx: {
    session: Session | null
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  },
  type: 'query' | 'mutation' | 'subscription',
  rawInput: unknown,
  path: string,
  data: string
): Promise<void> => {
  if (type === 'mutation') {
    await ctx.db.logHistory.create({
      data: {
        path: path,
        input: JSON.stringify(rawInput),
        output: data,
        userId: String(ctx.session?.user.id)
      }
    })
  }
}
