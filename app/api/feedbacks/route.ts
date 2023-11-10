import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { knownErrHandler } from '@/helpers/knownErrHanler'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) return NextResponse.json([])

    const feedbacks = await db.feedback.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(feedbacks)
  } catch (err) {
    return knownErrHandler(err, '[FEEDBACK_GET]')
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { content, userId } = body
    console.log('feedback', body)

    if (!content || !userId)
      return new NextResponse('All fields are required', { status: 400 })

    const fed = await db.feedback.create({
      data: { content, userId },
    })

    console.log(fed)

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (err) {
    return knownErrHandler(err, '[FEEDBACK_POST]')
  }
}
