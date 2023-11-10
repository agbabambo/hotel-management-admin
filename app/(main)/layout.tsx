import { redirect } from 'next/navigation'

import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const userAuth = await getAuthSession()

  if (!userAuth) redirect('/sign-in')

  const user = await db.user.findUnique({ where: { id: userAuth.user.id } })

  return (
    <div className='h-full flex'>
      <Sidebar />
      <main className='flex-1'>
        <TopBar user={user!} />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
