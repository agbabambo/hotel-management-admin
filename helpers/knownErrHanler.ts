import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

export const knownErrHandler = (
  err: any,
  path: string
): NextResponse<unknown> => {
  console.error(`[${path}]`, err)

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return new NextResponse(
        `Field ${err.meta?.target} is duplicated, please choose another value`,
        { status: 400 }
      )
    }
  }

  return new NextResponse('Internal error', { status: 500 })
}
