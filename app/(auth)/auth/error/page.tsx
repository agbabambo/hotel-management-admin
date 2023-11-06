'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
