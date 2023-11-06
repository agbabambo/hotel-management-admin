import { db } from '@/lib/db'
import * as paypal from '@/lib/paypal-api'
import { toObject } from '@/lib/query'
import { NextResponse } from 'next/server'
import { DateRange } from 'react-day-picker'

type IRoom = {
  id: string
  adults: number
  kids: number
  roomTypeId?: string | undefined
  isSelected?: boolean | undefined
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const userId: string = body.userId
    const orderId: string = body.orderId
    const reservation: IRoom[] = body.reservation as IRoom[]
    const dateRange: DateRange = body.dateRange as DateRange
    const roomCharge: number = +body.roomCharge as number

    const captureData = await paypal.capturePayment(orderId)

    if (!captureData.id)
      return new NextResponse('Payment failed', { status: 500 })

    const booking = await db.booking.create({
      data: {
        userId,
        startDate: dateRange.from!,
        endDate: dateRange.to!,
      },
    })

    reservation.forEach(async (res) => {
      const availableRoom = await db.room.findFirst({
        where: { status: 'empty', roomType: { id: res.roomTypeId } },
      })

      if (availableRoom) {
        await db.booking_Room.create({
          data: {
            bookingId: booking.id,
            roomId: availableRoom.id,
            numAdults: res.adults,
            numKids: res.kids,
          },
        })

        await db.room.update({
          where: { id: availableRoom.id },
          data: { status: 'booking' },
        })
      }
    })

    await db.payment.create({
      data: {
        id: captureData.id,
        roomCharge: roomCharge,
        userId,
        bookingId: booking.id,
      },
    })

    return NextResponse.json('OK')
  } catch (err: any) {
    console.log('API_PAYMENT_CAPTURE-PAYPAL', err)
    return new NextResponse(err.message, { status: 500 })
  }
}
