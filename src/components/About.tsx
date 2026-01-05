'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import restaurantImage1 from '@/images/about/restaurant1.webp'
import restaurantImage3 from '@/images/about/restaurant3.webp'
import restaurantImage4 from '@/images/about/restaurant4.webp'
import restaurantImage5 from '@/images/about/restaurant5.webp'
import restaurantImage6 from '@/images/about/restaurant6.webp'

const About = () => {
  // Array of images to flip through (add more images as needed)
  const images = [
    restaurantImage1,
    restaurantImage3,
    restaurantImage6,
    restaurantImage4,
    restaurantImage5,
  ]
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="py-6 md:py-12" style={{ backgroundColor: '#FFF3D4' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left - Image with green rectangle layers */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: 0 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[400px] sm:max-w-[400px] md:max-w-sm mx-auto lg:mx-0"
          >
            <div className="relative ">
              {/* Rectangle layers behind - stacked from front to back */}
              <div className="hidden lg:block absolute top-4 left-4 w-full h-full z-[2] rounded-md" style={{backgroundColor: '#00AA76'}}></div>
              <div className="hidden lg:block absolute top-8 left-8 w-full h-full bg-primary-green z-[1] rounded-md"></div>
              
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
                    className="relative w-full h-[420px] sm:h-[500px] md:h-[580px] lg:h-[650px]"
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'top left' }}
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt="ヒーローズ(Dining Your Hero's) 店内・スタッフ 佐世保・川下町の洋食居酒屋"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 100vw, 400px"
                    />
                    
                    {/* Simple click hint - only on first image */}
                    {currentImageIndex === 0 && (
                      <div className="absolute bottom-6 right-6 pointer-events-none transition-opacity duration-300">
                        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center justify-center">
                          <p className="font-bold text-white text-base md:text-xl whitespace-nowrap">タップしてを店内を見る</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: 0 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 text-center lg:text-left"
          >
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-primary-orange uppercase leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              ABOUT
              <br />
              YOUR HERO&apos;S
            </motion.h2>

            <motion.h3
              className="text-xl md:text-3xl font-black text-primary-green font-japanese"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              こだわりの料理と雰囲気
            </motion.h3>

            <motion.p
              className="text-xs md:text-lg text-left font-medium lg:font-normal leading-relaxed"
              style={{ color: '#000000' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              佐世保市にある『Dining your HERO&apos;s』は、ランチからディナーまで、手頃な価格でボリューム満点の料理を楽しめるカジュアルダイニングです。
お子様ランチのご用意や学割制度もあり、ご家族連れや学生さんなど、幅広い世代の方に日常使いしていただける空間作りを大切にしています。また、お酒のメニューも充実しており、女子会や忘新年会といった団体様のご予約も承っております。
お一人様でもグループでも、いつでも気軽にお立ち寄りください
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                href="/about"
                className="inline-block bg-primary-green text-white font-bold text-[clamp(1rem,3vw,1.5rem)] px-8 sm:px-10 lg:px-12 py-2.5 sm:py-3 rounded-full hover:bg-opacity-90 transition-all hover:scale-105 uppercase tracking-wide"
                style={{boxShadow: '1px 4px 0 0 #00AA76'}}
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
