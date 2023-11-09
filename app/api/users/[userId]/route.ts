import { db } from '@/lib/db'
import { Sex } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.userId },
      include: { address: true },
    })

    if (!user) return NextResponse.json({ message: 'No user found' })

    return NextResponse.json(user)
  } catch (err) {
    console.log('[USER_ID_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json()

    const { email, firstName, lastName, gender, phoneNumber, dateOfBirth } =
      body

    if (!email) return new NextResponse('Email is required', { status: 400 })

    console.log({ gender, dateOfBirth })

    await db.user.update({
      where: { id: params.userId },
      data: {
        email,
        firstName,
        lastName,
        sex: gender,
        birthday: dateOfBirth,
        address: {
          update: { data: { phone: phoneNumber } },
        },
      },
    })

    console.log(body)

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (err) {
    console.log('[USER_ID_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
