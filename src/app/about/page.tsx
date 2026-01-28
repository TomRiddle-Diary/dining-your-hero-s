import type { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us | ヒーローズ(Dining Your Hero\'s) 佐世保・川下町の洋食居酒屋',
  description: '佐世保市川下町の洋食居酒屋ヒーローズについて。アットホームな雰囲気で、ボリューム満点の料理をお楽しみいただけます。',
  openGraph: {
    title: 'About Us | ヒーローズ 佐世保・川下町の洋食居酒屋',
    description: 'アットホームな雰囲気で、ボリューム満点の料理をお楽しみいただけます',
    url: 'https://diningyourheros.com/about',
    siteName: 'ヒーローズ(Dining Your Hero\'s)',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <>
      <Header isFixed={false} />
      <AboutContent />
      <Footer />
    </>
  )
}
