'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import restaurantImage1 from '@/images/about/restaurant1.png'
import restaurantImage2 from '@/images/about/restaurant2.jpg'
import restaurantImage3 from '@/images/about/restaurant3.png'

const About = () => {
  // Array of images to flip through (add more images as needed)
  const images = [
    restaurantImage1,
    restaurantImage2, // Replace with different images when you have them
    restaurantImage3,
  ]
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="py-20" style={{ backgroundColor: '#FFF3D4' }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Image with green rectangle layers */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-sm mx-auto lg:mx-0"
          >
            <div className="relative">
              {/* Rectangle layers behind - stacked from front to back */}
              <div className="absolute top-4 left-4 w-full h-full z-[2] rounded-md" style={{backgroundColor: '#00AA76'}}></div>
              <div className="absolute top-8 left-8 w-full h-full bg-primary-green z-[1] rounded-md"></div>
              
              {/* Main vertical rectangular image with flip animation */}
              <div 
                className="relative z-10 overflow-hidden shadow-xl rounded-md cursor-pointer group"
                onClick={handleImageClick}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ rotateX: -45, rotateY: 45, opacity: 0 }}
                    animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                    exit={{ rotateX: 45, rotateY: -45, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-full h-[650px]"
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'top left' }}
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`Restaurant view ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                    
                    {/* Simple click hint - only on first image */}
                    {currentImageIndex === 0 && (
                      <div className="absolute bottom-6 right-6 text-white text-sm pointer-events-none transition-opacity duration-300" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                        <p>Click to explore →</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
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
              className="text-base md:text-lg leading-relaxed"
              style={{ color: '#000000' }}
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
