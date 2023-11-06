import { adminCheck } from '@/helpers/adminCheck'
import { knownErrHandler } from '@/helpers/knownErrHanler'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    await adminCheck()

    const body = await req.json()
    const { name, status, roomTypeId } = body

    if (!name || !status || !roomTypeId)
      return new NextResponse('All fields are required', { status: 400 })

    const room = await db.room.update({
      where: { id: params.roomId },
      data: { name, status, roomTypeId },
    })

    return NextResponse.json(room)
  } catch (err) {
    return knownErrHandler(err, 'ROOM_PATCH')
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    await adminCheck()

    const room = await db.room.findUnique({
      where: { id: params.roomId },
      include: { booking_rooms: true },
    })

    if (room?.booking_rooms.length)
      return new NextResponse('Remove all bookings has this room first.', {
        status: 400,
      })

    await db.vote.deleteMany({ where: { roomId: params.roomId } })

    await db.room.delete({
      where: { id: params.roomId },
    })

    return NextResponse.json('DELETED')
  } catch (err) {
    return knownErrHandler(err, 'ROOM_DELETE')
  }
}
