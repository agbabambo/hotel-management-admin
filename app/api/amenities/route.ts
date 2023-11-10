import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'

import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })
    if (session?.user.role !== Role.ADMIN)
      return new NextResponse(
        "You don't have permission to perform this action",
        { status: 401 }
      )

    const { name, description, image } = await req.json()
    if (!name || !description || !image)
      return new NextResponse('All fields are required', { status: 400 })

    const amenity = await db.amenity.create({
      data: { name, description, image },
    })

    return NextResponse.json(amenity)
  } catch (err) {
    console.log('[AMENITY_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
