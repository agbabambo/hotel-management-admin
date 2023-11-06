import SignIn from '@/components/auth/SignIn'

const page = () => {
  return (
    <div className='mt-20'>
      <div className='h-full max-w-xl mx-auto flex flex-col items-center justify-center gap-20'>
        <SignIn />
      </div>
    </div>
  )
}

export default page
