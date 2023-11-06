'use client'

import { FC } from 'react'

import 'react-alice-carousel/lib/alice-carousel.css'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import ImageCarousel from '@/components/ui/image-carousel'
// import MyCarousel from '@/components/ui/my-carousel'

interface TestProps {}

const items = ['/hotel/hotel1.jpg', '/hotel/hotel2.jpg', '/hotel/hotel3.jpg']

const Test: FC<TestProps> = () => {
  return (
    <div className='w-[450px]'>
      <ImageCarousel images={items} />
      {/* <MyCarousel images={items} /> */}
    </div>
  )
}

export default Test
