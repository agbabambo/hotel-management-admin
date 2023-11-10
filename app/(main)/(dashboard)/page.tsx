import { redirect } from 'next/navigation'

import { getAuthSession } from '@/lib/auth'
import Dashboard from './components/Dashboard'
import { db } from '@/lib/db'

const MainPage = async () => {
  const session = await getAuthSession()

  if (!session) return redirect('/sign-in')

  const bookings = await db.booking.findMany({
    select: { roomCharge: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })

  const users = await db.user.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className='h-full'>
      <Dashboard bookings={bookings} users={users} />
    </div>
  )
}

export default MainPage
