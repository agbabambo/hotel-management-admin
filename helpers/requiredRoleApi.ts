import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'

import { getAuthSession } from '@/lib/auth'

export const requiredRoleApi = async (
  role: Role[]
): Promise<NextResponse<unknown> | undefined> => {
  const session = await getAuthSession()
  if (!session) return new NextResponse('Unauthenticated', { status: 401 })
  if (!role.includes(session.user.role))
    return new NextResponse(
      "You don't have permission to perform this action",
      { status: 403 }
    )
}
