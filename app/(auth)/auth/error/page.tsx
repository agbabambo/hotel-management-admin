'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const Error = ({}) => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.back()
    }, 5000)
  }, [router])

  return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
      <h1 className='text-6xl text-primary font-bold'>Invalid credentials</h1>
      <Button className='underline mt-10' onClick={() => router.back()}>
        <ChevronLeftIcon className='h-6 w-6' />
        Go back
      </Button>
    </div>
  )
}

export default Error
