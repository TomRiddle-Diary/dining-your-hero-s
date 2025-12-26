'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, NavArrow, PaginationDots, cardVariants, ANIMATION_LOCK_DURATION, SPRING_CONFIG } from '@/components/shared/carouselUtils'
import katsuCurryImg from '@/images/menu/katsu_curry.png'
import turkeyRiceImg from '@/images/menu/turkey_rice.png'
import beefDonImg from '@/images/menu/beef_don.png'

const menuItems = [
  { id: 1, title: '山盛りチキンカツカレー', subtitle: 'ボリュームたっぷり！！\nお腹いっぱい!', image: katsuCurryImg },
  { id: 2, title: 'トルコライス', subtitle: '長崎名物\n大人のお子様ランチ', image: turkeyRiceImg, featured: true },
  { id: 3, title: 'ステーキ丼', subtitle: '柔らか赤身ステーキ\nガリバタソースでどうぞ!', image: beefDonImg },
] as const

const Menu = () => {
  const [centerIndex, setCenterIndex] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCenterIndex((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), ANIMATION_LOCK_DURATION)
  }, [isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCenterIndex((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), ANIMATION_LOCK_DURATION)
  }, [isAnimating])

  const handleCardClick = useCallback((position: 'left' | 'center' | 'right') => {
    if (isAnimating || position === 'center') return
    position === 'left' ? handlePrev() : handleNext()
  }, [isAnimating, handlePrev, handleNext])

  const handleDragEnd = useCallback((_: any, info: { offset: { x: number }, velocity: { x: number } }) => {
    if (isAnimating) return
    const swipeThreshold = 50
    const swipeVelocityThreshold = 500
    
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocityThreshold) {
      if (info.offset.x > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }
  }, [isAnimating, handlePrev, handleNext])

  const visibleItems = useMemo(() => {
    const leftIndex = centerIndex === 0 ? menuItems.length - 1 : centerIndex - 1
    const rightIndex = centerIndex === menuItems.length - 1 ? 0 : centerIndex + 1
    return [
      { ...menuItems[leftIndex], position: 'left' as const },
      { ...menuItems[centerIndex], position: 'center' as const },
      { ...menuItems[rightIndex], position: 'right' as const },
    ]
  }, [centerIndex])

  return (
    <section className="py-6 md:py-12 relative bg-[#FFF7E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader color="text-primary-green" marginBottom=''>THE HERO'S</SectionHeader>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-xl md:text-3xl font-black text-primary-orange font-japanese mt-2 sm:mt-4 md:mt-6"
        >
          人気メニュー
        </motion.p>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative flex items-center justify-center mb-0 lg:mb-0">
            <div className="hidden lg:block absolute left-0 z-20">
              <NavArrow direction="left" onClick={handlePrev} disabled={isAnimating} />
            </div>

            <motion.div 
              className="w-full max-w-[90vw] mx-auto lg:max-w-none overflow-visible cursor-grab active:cursor-grabbing"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <div className="flex items-center justify-center gap-2 md:gap-4">
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
                        className={`flex-shrink-0 ${
                          isCenter 
                            ? 'w-[75vw] max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]' 
                            : 'w-[40vw] max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] cursor-pointer lg:block'
                        }`}
                        whileHover={!isCenter ? { scale: 0.90 } : undefined}
                      >
                        <div className="relative">
                          <motion.div 
                            className="relative w-full aspect-[4/3] rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden"
                            whileHover={isCenter ? { scale: 1.03 } : undefined}
                            transition={SPRING_CONFIG}
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain pointer-events-none"
                              sizes="(max-width: 640px) 75vw, (max-width: 768px) 400px, 600px"
                              priority={item.id === 2}
                              draggable={false}
                            />
                          </motion.div>
                          <div className="p-2 sm:p-3 md:p-4 text-center">
                            <h3 className={`font-bold text-black mb-1 font-japanese ${
                              isCenter ? 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl' : 'text-xs sm:text-sm md:text-base lg:text-lg'
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`font-bold whitespace-pre-line leading-relaxed text-pink-500 font-japanese ${
                              isCenter ? 'text-xs sm:text-sm md:text-base lg:text-lg' : 'text-[10px] sm:text-xs md:text-sm'
                            }`}>
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="hidden lg:block absolute right-0 z-20">
              <NavArrow direction="right" onClick={handleNext} disabled={isAnimating} />
            </div>
          </div>

          {/* Mobile Pagination Dots - Below carousel */}
          <div className="lg:hidden mt-6 sm:mt-8">
            <PaginationDots 
              total={menuItems.length}
              activeIndex={centerIndex}
              onDotClick={(index) => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setCenterIndex(index)
                  setTimeout(() => setIsAnimating(false), ANIMATION_LOCK_DURATION)
                }
              }}
              disabled={isAnimating}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center mt-6 md:mt-8 px-4"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-primary-green text-white font-bold text-[clamp(1rem,3vw,1.5rem)] px-8 sm:px-10 lg:px-12 py-2.5 sm:py-3 rounded-full shadow-lg uppercase tracking-wide hover:bg-opacity-90 transition-all"
            style={{ boxShadow: '1px 4px 0 0 #00AA76' }}
          >
            READ MENU
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Menu