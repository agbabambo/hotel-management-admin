import { db } from '@/lib/db'
import Client from './components/client'

const RoomsPage = async () => {
  const rooms = await db.room.findMany({
    include: { roomType: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div className='p-10'>
      <Client data={rooms} />
    </div>
  )
}

export default RoomsPage
