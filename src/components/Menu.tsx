'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import katsuCurryImg from '@/images/menu/katus_curry.png'
import turkeyRiceImg from '@/images/menu/turky_rice.png'
import beefDonImg from '@/images/menu/beef_don.png'
import tag1 from '@/images/tags/tag1.svg'
import tag2 from '@/images/tags/tag2.svg'
import tag3 from '@/images/tags/tag3.svg'

// Menu items data
const menuItems = [
  {
    id: 1,
    badge: tag1,
    title: '山盛りチキンカツカレー',
    subtitle: 'ボリュームたっぷり！！\nお腹いっぱい!',
    image: katsuCurryImg,
  },
  {
    id: 2,
    badge: tag2,
    title: 'トルコライス',
    subtitle: '長崎名物\n大人のお子様ランチ',
    image: turkeyRiceImg,
    featured: true,
  },
  {
    id: 3,
    badge: tag3,
    title: 'ステーキ丼',
    subtitle: '柔らか赤身ステーキ\nガリバタソースでどうぞ!1',
    image: beefDonImg,
  },
]

const Menu = () => {
  const [centerIndex, setCenterIndex] = useState(1) // Start with middle item (Turkish Rice) as center
  const [direction, setDirection] = useState(0) // Track slide direction for animation

  const handlePrev = () => {
    setDirection(-1)
    setCenterIndex((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCenterIndex((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1))
  }

  // Get circular indices for left, center, right
  const getVisibleItems = () => {
    const leftIndex = centerIndex === 0 ? menuItems.length - 1 : centerIndex - 1
    const rightIndex = centerIndex === menuItems.length - 1 ? 0 : centerIndex + 1
    
    return [
      { ...menuItems[leftIndex], position: 'left', index: leftIndex },
      { ...menuItems[centerIndex], position: 'center', index: centerIndex },
      { ...menuItems[rightIndex], position: 'right', index: rightIndex },
    ]
  }

  const visibleItems = getVisibleItems()

  return (
    <section className="py-20 relative" style={{ backgroundColor: '#FFF7E3' }}>
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-5xl md:text-6xl font-bold text-primary-green uppercase leading-tight mb-16"
        >
          THE HERO,S
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center mb-16">
          
          {/* Left Arrow - Desktop Only */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex w-16 h-16 rounded-full border-4 border-primary-green bg-white items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg z-20 absolute left-0"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </motion.button>

          {/* Carousel Track */}
          <div className="relative w-full max-w-6xl h-[480px] flex items-center justify-center overflow-visible">
            <AnimatePresence initial={false} custom={direction}>
              {visibleItems.filter(item => item.position === 'center').map((item) => {
                const isCenter = true
                
                // Calculate positions and scales
                const getVariants = () => {
                  return {
                    center: {
                      x: 0,
                      scale: 1,
                      opacity: 1,
                      zIndex: 30,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }
                    }
                  }
                }

                return (
                  <motion.div
                    key={`${item.id}-${item.position}`}
                    custom={direction}
                    variants={getVariants()}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate="center"
                    className="absolute w-full max-w-md lg:max-w-xl"
                  >
                    {/* Card Container */}
                    <div className="relative mx-auto">
                      
                      {/* Image */ }
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 90vw, 600px"
                          priority={isCenter}
                        />
                      </div>

                      <div className="absolute top-2 right-2 lg:top-4 lg:right-4" style={{ width: '110px', height: '110px' }}>
                        <Image
                          src={item.badge}
                          alt="Badge"
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="p-4 lg:p-6 text-center">
                        <h3 
                          className="text-2xl lg:text-3xl font-black text-black mb-1 lg:mb-2"
                          style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        <p 
                          className="text-base lg:text-lg font-bold whitespace-pre-line leading-relaxed"
                          style={{ color: '#E91E63', fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif" }}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Desktop: Show side items */}
            <div className="hidden lg:block">
              <AnimatePresence initial={false} custom={direction}>
                {visibleItems.map((item) => {
                  const isCenter = item.position === 'center'
                  const isLeft = item.position === 'left'
                  
                  if (isCenter) return null
                  
                  const getVariants = () => {
                    if (isLeft) {
                      return {
                        center: {
                          x: '-95%',
                          scale: 0.7,
                          opacity: 1,
                          zIndex: 10,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }
                        }
                      }
                    } else {
                      return {
                        center: {
                          x: '95%',
                          scale: 0.7,
                          opacity: 1,
                          zIndex: 10,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }
                        }
                      }
                    }
                  }

                  return (
                    <motion.div
                      key={`${item.id}-${item.position}`}
                      custom={direction}
                      variants={getVariants()}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate="center"
                      className="absolute w-full max-w-md lg:max-w-xl pointer-events-none"
                    >
                      {/* Card Container */}
                      <div className="relative mx-auto">
                        
                        {/* Image */}
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="500px"
                          />
                        </div>

                        <div className="absolute top-2 right-2 lg:top-4 lg:right-4" style={{ width: '80px', height: '80px' }}>
                          <Image
                            src={item.badge}
                            alt="Badge"
                            fill
                            className="object-contain"
                          />
                        </div>

                        {/* Text Content */}
                        <div className="p-4 lg:p-6 text-center">
                          <h3 
                            className="text-2xl lg:text-3xl font-black text-black mb-1 lg:mb-2"
                            style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif" }}
                          >
                            {item.title}
                          </h3>
                          <p 
                            className="text-base lg:text-lg font-bold whitespace-pre-line leading-relaxed"
                            style={{ color: '#E91E63', fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif" }}
                          >
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow - Desktop Only */}
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex w-16 h-16 rounded-full border-4 border-primary-green bg-white items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg z-20 absolute right-0"
          >
            <ChevronRight size={32} strokeWidth={3} />
          </motion.button>

          {/* Mobile Navigation Arrows */}
          <div className="flex lg:hidden gap-4 absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full border-4 border-primary-green bg-white flex items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg"
            >
              <ChevronLeft size={28} strokeWidth={3} />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full border-4 border-primary-green bg-white flex items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg"
            >
              <ChevronRight size={28} strokeWidth={3} />
            </motion.button>
          </div>
        </div>

        {/* Read Menu Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center"
        >
          <Link 
            href="/menu"
            className="inline-block bg-primary-green font-bold text-2xl px-12 py-3 rounded-full hover:bg-opacity-90 transition-all hover:scale-105 uppercase tracking-wide"
            style={{color: '#FFFFFF', boxShadow: '1px 4px 0 0 #00AA76'}}
          >
            READ MENU
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Menu
