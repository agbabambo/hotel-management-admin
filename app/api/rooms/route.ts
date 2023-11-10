import { adminCheck } from '@/helpers/adminCheck'
import { knownErrHandler } from '@/helpers/knownErrHanler'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await adminCheck()

    const body = await req.json()

    const { name, status, roomTypeId } = body

    if (!name || !status || !roomTypeId) {
      return new NextResponse('All fields are required', { status: 400 })
    }

    if (status === 'booking')
      return new NextResponse(
        "You can't set room status as `booking` at creation",
        { status: 400 }
      )

    await db.room.create({
      data: {
        name,
        status,
        roomTypeId,
      },
    })

    return NextResponse.json('OK')
  } catch (err) {
    return knownErrHandler(err, 'ROOM_POST')
  }
}
