import type { Metadata } from 'next'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "佐世保・川下町の洋食居酒屋 ヒーローズ(Dining Your Hero's) | オードブル・飲み放題・人気メニュー・ランチ・ディナー",
  description: "ヒーローズ(Dining Your Hero's)は佐世保市川下町・相浦エリアで人気の洋食居酒屋。山盛りチキンカツカレーやトルコライスなど、ボリューム満点のメニューが揃うアットホームなレストランです。オードブルや飲み放題プランもご用意。ランチ・ディナー・学割・団体予約もOK!",
  // keywords: ["佐世保", "相浦", "川下町", "洋食", "居酒屋", "ヒーローズ", "チキンカツカレー", "トルコライス", "ランチ", "ディナー", "学割", "団体予約"]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* OGP & Twitter card for logo as search result icon */}
        <meta property="og:image" content="/logo.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="207" />
        <meta property="og:image:height" content="116" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/logo.png" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kaisei+Opti:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Oswald:wght@400;500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/8036d0d404.js" crossOrigin="anonymous" async></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8LPBY4XY8T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8LPBY4XY8T');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
