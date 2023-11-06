import { adminCheck } from '@/helpers/adminCheck'
import { knownErrHandler } from '@/helpers/knownErrHanler'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await adminCheck()

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

    const discount = await db.discount.create({
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
    return knownErrHandler(err, 'DISCOUNT_POST')
  }
}
