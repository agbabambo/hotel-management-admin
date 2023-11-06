import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import SignUp from '@/components/auth/SignUp'

const page = () => {
  return (
    <div className='mt-20'>
      <div className='h-full max-w-xl mx-auto flex flex-col items-center justify-center gap-10 pb-20'>
        <Link
          href='/'
          className={cn(buttonVariants({ variant: 'link' }), 'self-start')}
        >
          <ChevronLeftIcon className='mr-2 h-4 w-4' />
          Home
        </Link>
        <SignUp />
      </div>
    </div>
  )
}

export default page
