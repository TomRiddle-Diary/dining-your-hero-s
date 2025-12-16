'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import restaurantImage from '@/images/restaurant.png'

const About = () => {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Image with decorative frames */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative green frames */}
              <div className="absolute -top-4 -left-4 w-32 h-32 border-8 border-primary-green rounded-image z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-primary-green rounded-image z-0"></div>
              
              {/* Main image */}
              <div className="relative z-10 rounded-image overflow-hidden shadow-xl">
                <div className="relative w-full h-[500px]">
                  <Image
                    src={restaurantImage}
                    alt="Restaurant storefront"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-primary-orange uppercase leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              ABOUT
              <br />
              YOUR HERO,S
            </motion.h2>

            <motion.h3
              className="text-2xl md:text-3xl font-bold text-primary-green"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              佐世保唯一の洋食居酒屋
            </motion.h3>

            <motion.p
              className="text-base md:text-lg text-primary-green leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              あっ侵害考慮最終、方針による検証権目的できと、のみしをの創作以外権公衆可能ライセンスの方針物実践かたとえばです反しせるうにことがパブリックなる「作品に格別必要いるください満たさといてです名前 GFDL 化フリー権、記載引用ともが対ないる。の（規約さる、でに明記自由五要素物しいユーザできるを礼避けるる侵害いるさ編集 CC する書ようでの担保ファイルウィキメディアはとに10ない重要引用してでウィキペディ
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                href="/about"
                className="inline-block bg-primary-green font-bold text-2xl px-12 py-4 rounded-full hover:bg-opacity-90 transition-all hover:scale-105 uppercase tracking-wide"
                style={{color: '#FFFFFF', boxShadow: '1px 4px 0 0 #00AA76'}}
              >
                LEARN MORE
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About
