import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { amenityId: string } }
) {
  try {
    const { name, description } = await req.json()

    if (!params.amenityId)
      return new NextResponse('Amenity ID missing', { status: 400 })

    const amenity = await db.amenity.update({
      where: { id: params.amenityId },
      data: { name, description },
    })

    return NextResponse.json(amenity)
  } catch (err) {
    console.log('[AMENITY_ID_PATCH]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { amenityId: string } }
) {
  try {
    if (!params.amenityId)
      return new NextResponse('Amenity ID missing', { status: 400 })

    await db.amenity_RoomType.deleteMany({
      where: { amenityId: params.amenityId },
    })

    await db.amenity.delete({
      where: { id: params.amenityId },
    })

    return NextResponse.json('DELETED')
  } catch (err) {
    console.log('[AMENITY_ID_DELETE]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
