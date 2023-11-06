import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { discountId: string } }
) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const body = await req.json()
    const {
      name,
      description,
      discountPercent,
      startDate,
      endDate,
      roomTypeIds,
    } = body

    if (
      !name ||
      !description ||
      !discountPercent ||
      !startDate ||
      !endDate ||
      !roomTypeIds.length
    ) {
      return new NextResponse('All fields are required', { status: 400 })
    }

    const discount = await db.discount.update({
      where: { id: params.discountId },
      data: {
        name,
        description,
        discountPercent,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        roomTypes: {
          connect: roomTypeIds.map((id: string) => ({ id })),
        },
      },
    })

    return NextResponse.json(discount)
  } catch (err) {
    console.log('[DISCOUNT_PATCH]', err)
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
}

export async function DELETE(
  req: Request,
  { params }: { params: { discountId: string } }
) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    await db.roomType.updateMany({
      where: { discountId: params.discountId },
      data: { discountId: null },
    })

    await db.discount.delete({
      where: { id: params.discountId },
    })

    return NextResponse.json({ status: 'OK' })
  } catch (err) {
    console.log('[DISCOUNT_PATCH]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
