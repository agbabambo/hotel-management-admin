import { getAuthSession } from '@/lib/auth'
import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'

export const roleCheck = async (role: Role) => {
  const session = await getAuthSession()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })
  if (session.user.role !== role) {
    return new NextResponse(
      "You don't have permission to perform this action",
      { status: 401 }
    )
  }
  return true
}
