import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full flex'>
      <Sidebar />
      <main className='flex-1 flex flex-col'>
        <TopBar />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
