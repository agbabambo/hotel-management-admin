import { adminCheck } from '@/helpers/adminCheck'
import { knownErrHandler } from '@/helpers/knownErrHanler'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const roomTypes = await db.roomType.findMany({
      include: {
        rooms: { include: { booking_rooms: true } },
        discount: true,
      },
    })

    return NextResponse.json(roomTypes)
  } catch (err) {
    return knownErrHandler(err, 'ROOM_TYPE_GET')
  }
}

export async function POST(req: Request) {
  try {
    await adminCheck()

    const body = await req.json()
    const {
      name,
      description,
      occupancy,
      numBeg,
      images,
      price,
      maxBookingDay,
      amenities,
    } = body

    if (
      !name ||
      !description ||
      !occupancy ||
      !numBeg ||
      !images ||
      !images.length ||
      !price ||
      !maxBookingDay ||
      !amenities.length
    ) {
      return new NextResponse('All fields are required', { status: 400 })
    }

    const roomTypes = await db.roomType.create({
      data: {
        name,
        description,
        occupancy,
        numBeg,
        images,
        price,
        maxBookingDay,
        amenity_RoomTypes: {
          createMany: {
            data: amenities.map((amenityId: string) => ({ amenityId })),
          },
        },
      },
    })

    return NextResponse.json(roomTypes)
  } catch (err) {
    return knownErrHandler(err, 'ROOM_TYPE_POST')
  }
}
