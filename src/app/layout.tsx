import { Suspense } from 'react'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Providers } from './providers'
import { LoadingPage } from '@/components/ui/loading-spinner'
import './globals.css'
import { metadata } from './metadata'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
})

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans bg-secondary text-primary selection:bg-accent/20 selection:text-primary">
        <Providers>
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
