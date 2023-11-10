import { format } from 'date-fns'

import { db } from '@/lib/db'
import { Column, columns } from './components/columns'
import { DataTable } from '@/components/ui/data-table'

const BookingPage = async ({ params }: { params: { bookingId: string } }) => {
  const roomTypes = await db.booking.findMany({
    where: { id: params.bookingId },
    include: { booking_rooms: { include: { room: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const formattedData: Column[] = roomTypes.map((item) => ({
    id: item.id,
    startDate: format(new Date(item.startDate), 'MMMM do, yyyy'),
    endDate: format(new Date(item.endDate), 'MMMM do, yyyy'),
    roomName: item.booking_rooms.map((b) => b.room.name).join(', '),
    roomCharge: item.roomCharge,
  }))

  return (
    <div className='p-10'>
      <h1 className='tracking-tight text-3xl font-semibold'>
        Booking ({formattedData.length})
      </h1>
      <p>Manage Booking</p>

      <hr className='my-6' />

      <DataTable data={formattedData} columns={columns} searchKey='roomName' />
    </div>
  )
}

export default BookingPage
