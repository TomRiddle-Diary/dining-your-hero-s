import Link from 'next/link';
import type { Metadata } from 'next'

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
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FFF7E3] px-4">
      <h1 className="text-2xl md:text-4xl font-black text-primary-green mb-6 font-japanese">About Us</h1>
      <p className="text-lg md:text-2xl font-bold text-primary-orange font-japanese text-center mb-8">
        ページが完成するまでしばらくお待ちください
      </p>
      <Link
        href="/"
        className="inline-block bg-primary-green text-white font-black text-lg md:text-xl px-6 py-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all font-japanese"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
