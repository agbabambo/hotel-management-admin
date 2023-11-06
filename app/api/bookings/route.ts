import { knownErrHandler } from '@/helpers/knownErrHanler'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const body = await req.json()

    const bookings = await db.booking.findMany({
      // where: { userId: body.userId },
      include: {
        booking_rooms: {
          include: { room: { include: { roomType: true } }, booking: true },
        },
      },
    })

    return NextResponse.json(bookings)
  } catch (err) {
    return knownErrHandler(err, 'ROOM_TYPE_GET')
  }
}
