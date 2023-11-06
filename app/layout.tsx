import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import './globals.css'
import AuthProvider from '@/components/providers/AuthProvider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Winterfall Hotel Management',
  description: 'Winterfall Hotel Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='dark'>
      <body className={font.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
