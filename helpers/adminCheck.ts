import { getAuthSession } from '@/lib/auth'
import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'

export const adminCheck = async (): Promise<
  NextResponse<unknown> | undefined
> => {
  const session = await getAuthSession()
  if (!session) return new NextResponse('Unauthenticated', { status: 403 })
  if (session.user.role !== Role.ADMIN)
    return new NextResponse(
      "You don't have permission to perform this action",
      { status: 401 }
    )
}
