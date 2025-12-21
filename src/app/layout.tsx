import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dining Your Hero,s - Japanese Restaurant',
  description: 'Experience authentic Japanese cuisine at Dining Your Hero,s',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/8036d0d404.js" crossOrigin="anonymous" async></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
