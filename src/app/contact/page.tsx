import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Access from '@/components/Access';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問い合わせ | ヒーローズ(Dining Your Hero\'s) 佐世保・川下町の洋食居酒屋',
  description: '佐世保市川下町の洋食居酒屋ヒーローズへのお問い合わせはこちら。メニューに関するご質問、ご予約、団体のご相談など、お気軽にお問い合わせください。',
  openGraph: {
    title: 'お問い合わせ | ヒーローズ 佐世保・川下町の洋食居酒屋',
    description: 'メニューに関するご質問、ご予約など、お気軽にお問い合わせください',
    url: 'https://diningyourheros.com/contact',
    siteName: 'ヒーローズ(Dining Your Hero\'s)',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FFF7E3]">
      <Header />
      <ContactForm />
      <Access />
      <Footer />
    </div>
  );
}
