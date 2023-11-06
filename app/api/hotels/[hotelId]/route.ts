import { adminCheck } from '@/helpers/adminCheck'
import { knownErrHandler } from '@/helpers/knownErrHanler'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const hotel = await db.hotel.findUnique({ where: { id: params.hotelId } })

    return NextResponse.json(hotel)
  } catch (err) {
    return knownErrHandler(err, 'HOTEL_ID_GET')
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    await adminCheck()

    const body = await req.json()
    const {
      name,
      description,
      phoneNumber,
      ward,
      district,
      province,
      coordinate,
      addressLine,
      images,
      amenities,
    } = body

    if (
      !name ||
      !description ||
      !phoneNumber ||
      !ward ||
      !district ||
      !province ||
      !coordinate ||
      !addressLine ||
      !images ||
      !images.length ||
      !amenities.length
    ) {
      return new NextResponse('All fields are required', { status: 400 })
    }

    const hotel = await db.hotel.update({
      where: {
        id: params.hotelId,
      },
      data: {
        name,
        description,
        images,
        address: {
          update: {
            contactName: name,
            addressLine,
            coordinate,
            phone: phoneNumber,
            ward,
            district,
            province,
          },
        },
        amenity_Hotels: {
          createMany: {
            data: amenities.map((amenityId: string) => ({ amenityId })),
            skipDuplicates: true,
          },
        },
      },
    })

    return NextResponse.json(hotel)
  } catch (err) {
    return knownErrHandler(err, 'HOTEL_PATCH')
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    await adminCheck()

    const rooms = await db.room.findMany({
      where: { roomTypeId: params.hotelId },
    })

    if (rooms.length !== 0) {
      return new NextResponse(
        "You can't delete, please remove all rooms that have this hotel first",
        { status: 400 }
      )
    }

    await db.hotel.update({
      where: { id: params.hotelId },
      data: { isArchived: true },
    })

    return NextResponse.json('DELETED')
  } catch (err) {
    return knownErrHandler(err, 'HOTEL_DELETE')
  }
}
