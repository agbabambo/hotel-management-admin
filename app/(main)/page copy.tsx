import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import MeCard from './(dashboard)/components/MeCard'
import ChartCard from './(dashboard)/components/ChartCard'
import { db } from '@/lib/db'
import { Separator } from '@/components/ui/separator'
import MainChart from './(dashboard)/components/Chart'
import { StarHalfIcon, StarIcon } from 'lucide-react'
import { roomStatus } from './hotels/[hotelId]/rooms/data'

const MainPage = async ({}) => {
  const session = await getAuthSession()

  if (!session) return redirect('/sign-in')

  const users = await db.user.findMany({})
  const roomTypes = await db.roomType.findMany({})
  const discounts = await db.discount.findMany({})
  const rooms = await db.room.findMany({})
  const amenities = await db.amenity.findMany({})
  const votes = 4.5

  return (
    <div className='bg-teal-50 p-10 h-full'>
      <div>
        <div>
          <h1 className='tracking-tight text-3xl font-semibold'>Dashboard</h1>
          <p>Overview</p>
        </div>
      </div>

      <hr className='my-6' />

      <div className='flex gap-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 flex-1'>
          <MeCard>
            <ChartCard
              up
              href='/'
              label='Customers'
              change={20.1}
              value={users.length}
            />
          </MeCard>

          <MeCard>
            <ChartCard
              up={false}
              href='/bookings'
              label='Bookings'
              value={123}
              change={13.5}
            />
          </MeCard>

          <MeCard>
            <ChartCard
              up={true}
              href='/'
              label='Votes'
              value={4.5}
              change={0.5}
            >
              <div className='flex gap-1 mr-10 items-center h-full'>
                {[...Array(Math.floor(votes))].map((_, i) => (
                  <StarIcon
                    fill='#fbbf24'
                    className='text-yellow-400 w-6 h-6'
                    key={i}
                  />
                ))}
                {votes - Math.floor(votes) > 0 ? (
                  <StarHalfIcon
                    className='w-6 h-6 text-yellow-400'
                    fill='#fbbf24'
                  />
                ) : null}
              </div>
            </ChartCard>
          </MeCard>

          <MeCard className='col-span-3'>
            <MainChart />
          </MeCard>
        </div>

        <MeCard className='space-y-3 col-span-3 max-w-[300px]'>
          <h3 className='font-medium text text-slate-500'>Configuration</h3>
          <hr />
          <div>
            <div className='font-medium text-slate-600 text-sm'>
              Rooms ({rooms.length})
            </div>
            <div className='flex flex-wrap text-slate-600 gap-3 mt-3 ml-10'>
              {roomStatus.map((status) => (
                <div key={status.color} className='flex items-center gap-2'>
                  <div
                    className='w-4 h-4 rounded-full'
                    style={{ backgroundColor: status.color }}
                  />
                  <p className='inline text-xs whitespace-nowrap'>
                    {status.label} (
                    {rooms.filter((r) => r.status === status.label).length})
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='font-medium text-slate-600 text-sm'>
              Room Types ({roomTypes.length})
            </div>
          </div>
          <Separator className='my-3' />

          <div>
            <div className='font-medium text-slate-600 text-sm'>
              Amenities ({roomTypes.length})
            </div>
          </div>
          <Separator className='my-3' />

          <div>
            <div className='font-medium text-slate-600 text-sm'>
              Discounts ({roomTypes.length})
            </div>
          </div>
        </MeCard>
      </div>
    </div>
  )
}

export default MainPage
