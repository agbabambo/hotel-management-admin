import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const MainPage = async ({}) => {
  const session = await getAuthSession()

  if (!session) return redirect('/sign-in')

  return <div></div>
}

export default MainPage
