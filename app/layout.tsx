import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { PortfolioProvider } from '@/context/PortfolioContext'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bijendra Mishra - Full Stack Developer',
  description: 'Portfolio of Bijendra Mishra, a passionate full-stack developer specializing in modern web technologies.',
  keywords: 'developer, portfolio, react, nodejs, fullstack',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased overflow-x-hidden">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  )
}
