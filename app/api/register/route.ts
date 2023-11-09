import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { Role } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const user = await db.user.findUnique({
      where: { email: body.email },
    })

    if (user)
      return new NextResponse('Duplicated email, please try another email.', {
        status: 401,
      })

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const address = await db.address.create({
      data: {
        addressLine: body.address,
        phone: body.phoneNumber,
      },
    })

    await db.user.create({
      data: {
        address: body.address,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
        role: Role.MEMBER,
        addressId: address.id,
      },
    })

    // TODO: after this?
    return NextResponse.json('ok')
    // return NextResponse.redirect('/sign-in')
  } catch (err) {
    console.log('AUTH_REGISTER_POST', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
