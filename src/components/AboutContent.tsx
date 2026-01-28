'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import about1 from '@/images/about-page/about1.webp'
import about2 from '@/images/about-page/about2.webp'
import about3 from '@/images/about-page/about3.webp'
import about4 from '@/images/about-page/about4.webp'

// Brush stroke divider component using the actual SVG
const BrushDivider = ({ color = '#0B4943', rotate = 0 }: { color?: string, rotate?: number }) => (
  <div className="max-w-6xl mx-auto px-4 md:px-8">
    <div className="w-full my-2 md:my-4 overflow-hidden">
      <svg 
        viewBox="0 0 1349 101" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ transform: `rotate(0deg)` }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path 
          d="M641.099 21.4882C419.873 -17.429 150.177 5.2727 42.9816 21.4882H138.266L0 48.4954L176.069 30.7142L42.9816 60.0699L209.729 48.4954L91.9984 71.6358C205.425 57.5297 504.763 63.6041 641.099 78.522C764.968 92.0759 1164.65 99.1548 1349 101L1237.14 90.9352L1349 70.1347H1237.14L1349 48.4954H1217.98L1349 21.4882C1205.21 37.7037 862.324 60.4054 641.099 21.4882Z" 
          fill={color}
        />
      </svg>
    </div>
  </div>
)

// Desktop divider with rotation
const BrushDividerDesktop = ({ color = '#0B4943', rotate = 0 }: { color?: string, rotate?: number }) => (
  <div className="hidden md:block max-w-6xl mx-auto px-4 md:px-8">
    <div className="w-full my-2 md:my-4 overflow-hidden" style={{ transform: `rotate(${rotate}deg)` }}>
      <svg 
        viewBox="0 0 1349 101" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <path 
          d="M641.099 21.4882C419.873 -17.429 150.177 5.2727 42.9816 21.4882H138.266L0 48.4954L176.069 30.7142L42.9816 60.0699L209.729 48.4954L91.9984 71.6358C205.425 57.5297 504.763 63.6041 641.099 78.522C764.968 92.0759 1164.65 99.1548 1349 101L1237.14 90.9352L1349 70.1347H1237.14L1349 48.4954H1217.98L1349 21.4882C1205.21 37.7037 862.324 60.4054 641.099 21.4882Z" 
          fill={color}
        />
      </svg>
    </div>
  </div>
)

export default function AboutContent() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7E3' }}>
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-8 pt-6 md:pt-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0D4D4D] mb-4 tracking-wider">
          MEET YOUR HERO&apos;S
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl font-black text-[#FF6B1A] font-japanese">
          ヒーローズの物語
        </p>
      </div>

      {/* Brush Divider 1 - Before Section 1 */}
      <div className="block md:hidden">
        <BrushDivider color="#0B4943" />
      </div>
      <div className="hidden md:block">
        <BrushDividerDesktop color="#0B4943" rotate={0} />
      </div>

      {/* Section 1: 佐世保で腕を磨き続けて40年 */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-12 items-center justify-center">
            <div className="relative w-full max-w-xs md:max-w-sm mx-auto md:mx-0">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src={about1}
                  alt="佐世保で腕を磨き続けて40年"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:space-y-4 max-w-md">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-center md:text-left" style={{ color: '#0B4943' }}>
                佐世保で腕を磨き続けて40年
              </h2>
              <p className="text-sm md:text-xl leading-relaxed text-left font-kaisei" style={{ color: '#1A0F08' }}>
                こんにちはヒーローズ店主の高井良です。高校時代に祖母と料理を楽しんだあの頃のワクワクをそのままに、料理人として40年以上、ヒーローズでで13年、愛される洋食を作り続けています。
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Brush Divider 2 */}
      <div className="block md:hidden">
        <BrushDivider color="#FA7115" />
      </div>
      <div className="hidden md:block">
        <BrushDividerDesktop color="#FA7115" rotate={-4} />
      </div>

      {/* Section 2: 始まりは高校時代の台所から */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-12 items-center justify-center">
            <div className="space-y-2 md:space-y-4 order-2 md:order-1 max-w-md">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-center md:text-left" style={{ color: '#FA7115' }}>
                始まりは高校時代の台所から
              </h2>
              <p className="text-sm md:text-xl leading-relaxed text-left font-kaisei" style={{ color: '#1A0F08' }}>
                料理の道に入ったきっかけは、高校生の頃。祖母と一緒に台所に立ち、料理を作る楽しさに目覚めたのがすべての始まりでした。そこから調理師学校を経て、ハウステンボスの企業館などで洋食一筋に腕を磨き、気づけば料理人歴は40年を超えました。
              </p>
            </div>

            <div className="hidden md:block relative w-full max-w-xs md:max-w-sm mx-auto md:mx-0 order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src={about2}
                  alt="始まりは高校時代の台所から"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Brush Divider 3 - Left tilt */}
      <div className="block md:hidden">
        <BrushDivider color="#0B4943" />
      </div>
      <div className="hidden md:block">
        <BrushDividerDesktop color="#0B4943" rotate={4} />
      </div>

      {/* Section 3: 料理へのこだわり */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-12 items-center justify-center">
            <div className="hidden md:block relative w-full max-w-xs md:max-w-sm mx-auto md:mx-0">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src={about3}
                  alt="料理へのこだわり"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:space-y-4 max-w-md">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-center md:text-left" style={{ color: '#0B4943' }}>
                料理へのこだわり
              </h2>
              <p className="text-sm md:text-xl leading-relaxed text-left font-kaisei" style={{ color: '#1A0F08' }}>
                次は何を食べようかとワクワクしてほしくて、気づけばメニューは驚くほどのバリエーションになっていました。その根底にあるのは地元佐世保や長崎の豊かな食材です。新鮮な魚介や野菜といった地産地消を大切にしながら、洋食の枠にとらわれない創作料理を日々お届けしています。
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final Brush Divider - Right tilt */}
      <div className="block md:hidden">
        <BrushDivider color="#FA7115" />
      </div>
      <div className="hidden md:block">
        <BrushDividerDesktop color="#FA7115" rotate={-4} />
      </div>

      {/* Section 4: 実は誰よりも気さくな料理人です */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-12 items-center justify-center">
            <div className="space-y-2 md:space-y-4 order-2 md:order-1 max-w-md">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-center md:text-left" style={{ color: '#FA7115' }}>
                実は誰よりも気さくな料理人です
              </h2>
              <p className="text-sm md:text-xl leading-relaxed text-left font-kaisei" style={{ color: '#1A0F08' }}>
                一見するとコワモテに見えるかもしれませんが、話してみると意外に優しい。そんな風に言っていただけることが僕にとって一番の喜びです。料理やお酒の話だけでなく、日々の何気ない出来事など、ぜひ気軽にお声がけください。これからもヒーローズをよろしくお願いいたします。
              </p>
            </div>

            <div className="relative w-full max-w-xs md:max-w-sm mx-auto md:mx-0 order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src={about4}
                  alt="実は誰よりも気まぐれな料理人です"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bottom spacing */}
      <div className="h-10 md:h-16"></div>

    </div>
  )
}
