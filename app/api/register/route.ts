import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { Role } from '@prisma/client'

import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('REGISTER, ', body)

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
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
        role: Role.CUSTOMER,
        addressId: address.id,
      },
    })

    return NextResponse.json('ok')
  } catch (err) {
    console.log('AUTH_REGISTER_POST', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
