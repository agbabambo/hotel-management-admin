import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { adminCheck } from '@/helpers/adminCheck'
import { knownErrHandler } from '@/helpers/knownErrHanler'
import queryString from 'query-string'

export async function GET(req: Request) {
  const query = queryString.parse(req.url)

  try {
    if (!query.p) return NextResponse.json([])

    const hotels = await db.hotel.findMany({
      where: {
        address: { province: +query.p },
      },
      include: {
        address: true,
        amenity_Hotels: { include: { amenity: true } },
        roomTypes: true,
      },
    })

    return NextResponse.json(hotels)
  } catch (err) {
    return knownErrHandler(err, 'HOTEL_GET')
  }
}

export async function POST(req: Request) {
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

    const hotel = await db.hotel.create({
      data: {
        name,
        description,
        images,
        address: {
          create: {
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
          },
        },
      },
    })

    return NextResponse.json(hotel)
  } catch (err) {
    return knownErrHandler(err, 'HOTEL_POST')
  }
}
