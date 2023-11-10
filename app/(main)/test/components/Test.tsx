'use client'

import { FC } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import ImageCarousel from '@/components/ui/image-carousel'
import DataTable from './Chart'
// import MyCarousel from '@/components/ui/my-carousel'

interface TestProps {}

const items = ['/hotel/hotel1.jpg', '/hotel/hotel2.jpg', '/hotel/hotel3.jpg']

const Test: FC<TestProps> = () => {
  return (
    <div className='bg-white w-full h-full'>
      {/* <ImageCarousel images={items} /> */}
      {/* <MyCarousel images={items} /> */}
      <DataTable />
    </div>
  )
}

export default Test
