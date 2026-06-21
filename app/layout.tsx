import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
})

export const metadata: Metadata = {
  title: 'Tirthesh Dhaygude | Software Engineer',
  description: 'Portfolio of Tirthesh Dhaygude — Software Engineer from Mumbai. Explore through an RPG game.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pixelFont.variable} font-pixel bg-[#0a0a0f] overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}
