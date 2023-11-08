import { NextResponse } from 'next/server'

import { knownErrHandler } from '@/helpers/knownErrHanler'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    // TODO: fix the other route
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) return NextResponse.json([])

    const bookings = await db.booking.findMany({
      where: { userId },
      include: {
        booking_rooms: {
          include: { room: { include: { roomType: true } }, booking: true },
        },
      },
    })
    return NextResponse.json(bookings)

    return NextResponse.json({ hmm: 'hi there' })
  } catch (err) {
    return knownErrHandler(err, 'ROOM_TYPE_GET')
  }
}
