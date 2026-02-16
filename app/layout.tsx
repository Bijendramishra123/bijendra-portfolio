import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PortfolioProvider } from '@/context/PortfolioContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Metadata without viewport
export const metadata: Metadata = {
  title: 'Bijendra Mishra - Full Stack Developer',
  description: 'Portfolio of Bijendra Mishra, a passionate full-stack developer specializing in modern web technologies.',
  keywords: 'developer, portfolio, react, nodejs, fullstack',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased overflow-x-hidden`}>
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  )
}