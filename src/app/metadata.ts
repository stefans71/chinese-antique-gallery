import { Metadata } from 'next'

const description = 'Discover rare and exquisite Chinese antique paintings from various dynasties'

export const metadata: Metadata = {
  title: {
    default: 'Chinese Antique Gallery',
    template: '%s | Chinese Antique Gallery',
  },
  description,
  keywords: ['Chinese art', 'antique paintings', 'dynasty art', 'collectibles'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Chinese Antique Gallery',
    description,
    siteName: 'Chinese Antique Gallery',
  },
  robots: {
    index: true,
    follow: true,
  },
}
