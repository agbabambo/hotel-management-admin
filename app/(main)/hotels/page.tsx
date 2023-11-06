import { db } from '@/lib/db'
import { Column, columns } from './components/columns'
import { DataTable } from '@/components/ui/data-table'
import { infoData } from './data'

const HotelPage = async () => {
  const hotels = await db.hotel.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      address: true,
    },
  })

  const formattedData: Column[] = hotels.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    address: item.address.addressLine,
    images: item.images,
    createdAt: item.createdAt,
  }))

  return (
    <div className='p-10'>
      <h1 className='tracking-tight text-3xl font-semibold'>
        {infoData.label} ({formattedData.length})
      </h1>
      <p>Manage {infoData.label}</p>

      <hr className='my-6' />

      <DataTable data={formattedData} columns={columns} searchKey='name' />
    </div>
  )
}

export default HotelPage
