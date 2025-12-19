'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import katsuCurryImg from '@/images/menu/katsu_curry.png'
import turkeyRiceImg from '@/images/menu/turkey_rice.png'
import beefDonImg from '@/images/menu/beef_don.png'

// Menu items data - IMMUTABLE constant
const menuItems = [
  {
    id: 1,
    title: '山盛りチキンカツカレー',
    subtitle: 'ボリュームたっぷり！！\nお腹いっぱい!',
    image: katsuCurryImg,
  },
  {
    id: 2,
    title: 'トルコライス',
    subtitle: '長崎名物\n大人のお子様ランチ',
    image: turkeyRiceImg,
    featured: true,
  },
  {
    id: 3,
    title: 'ステーキ丼',
    subtitle: '柔らか赤身ステーキ\nガリバタソースでどうぞ!1',
    image: beefDonImg,
  },
] as const

// Pre-define variants for GPU-accelerated animations
const cardVariants = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 30,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      mass: 1,
    },
  },
  side: {
    scale: 0.75,
    opacity: 0.8,
    zIndex: 10,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      mass: 1,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

const Menu = () => {
  const [centerIndex, setCenterIndex] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  // Prevent rapid clicks causing race conditions
  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCenterIndex((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 300)
  }, [isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCenterIndex((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 300)
  }, [isAnimating])

  // Handle click on side cards to bring them to center
  const handleCardClick = useCallback((position: 'left' | 'center' | 'right') => {
    if (isAnimating || position === 'center') return
    
    if (position === 'left') {
      handlePrev()
    } else if (position === 'right') {
      handleNext()
    }
  }, [isAnimating, handlePrev, handleNext])

  // Memoize to prevent re-creating objects on every render
  const visibleItems = useMemo(() => {
    const leftIndex = centerIndex === 0 ? menuItems.length - 1 : centerIndex - 1
    const rightIndex = centerIndex === menuItems.length - 1 ? 0 : centerIndex + 1
    
    return [
      { ...menuItems[leftIndex], position: 'left' as const, index: leftIndex },
      { ...menuItems[centerIndex], position: 'center' as const, index: centerIndex },
      { ...menuItems[rightIndex], position: 'right' as const, index: rightIndex },
    ]
  }, [centerIndex])

  return (
    <section className="py-14 relative" style={{ backgroundColor: '#FFF7E3' }}>
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-5xl md:text-6xl font-bold text-primary-green uppercase leading-tight"
        >
          THE HERO,S
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative max-w-6xl px-6 mx-auto">
          <div className="relative flex items-center justify-center mb-4">
            
            {/* Left Arrow - Desktop Only */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex w-14 h-14 rounded-full border-2 border-primary-green bg-white items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg z-20 absolute left-2 lg:left-4"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </motion.button>

          {/* Carousel Track */}
          <motion.div 
            className="relative w-full max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 lg:gap-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleItems.map((item) => {
                  const isCenter = item.position === 'center'

                  return (
                    <motion.div
                      key={item.id}
                      layoutId={`card-${item.id}`}
                      variants={cardVariants}
                      initial="side"
                      animate={isCenter ? 'center' : 'side'}
                      exit="exit"
                      onClick={() => handleCardClick(item.position)}
                      className={`flex-shrink-0 ${isCenter ? 'w-[500px] lg:w-[600px]' : 'w-[240px] lg:w-[280px] cursor-pointer'}`}
                      style={{ 
                        willChange: 'transform, opacity',
                      }}
                      whileHover={!isCenter ? { scale: 0.85 } : undefined}
                      whileTap={!isCenter ? { scale: 0.8 } : undefined}
                    >
                      {/* Card Container with GPU acceleration hint */}
                      <motion.div 
                        className="relative w-full"
                        style={{ transform: 'translateZ(0)' }}
                      >
                        
                        {/* Image */}
                        <motion.div 
                          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none"
                          onDragStart={(e) => e.preventDefault()}
                          whileHover={isCenter ? { scale: 1.08 } : undefined}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain pointer-events-none select-none"
                            sizes="(max-width: 768px) 240px, 600px"
                            priority={item.id === 2}
                            draggable={false}
                            unoptimized={false}
                          />
                        </motion.div>

                        {/* Text Content - Using Tailwind classes instead of inline styles */}
                        <div className="p-4 text-center">
                          <motion.h3 
                            layoutId={`title-${item.id}`}
                            className={`font-bold text-black mb-1 font-japanese ${
                              isCenter ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'
                            }`}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p 
                            layoutId={`subtitle-${item.id}`}
                            className={`font-bold whitespace-pre-line leading-relaxed text-pink-500 font-japanese ${
                              isCenter ? 'text-base lg:text-lg' : 'text-sm lg:text-base'
                            }`}
                          >
                            {item.subtitle}
                          </motion.p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </motion.div>

            {/* Right Arrow - Desktop Only */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex w-14 h-14 rounded-full border-2 border-primary-green bg-white items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg z-20 absolute right-0"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </motion.button>

            {/* Mobile Navigation Arrows */}
            <div className="flex lg:hidden gap-4 absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border-2 border-primary-green bg-white flex items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border-2 border-primary-green bg-white flex items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </motion.button>
            </div>
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