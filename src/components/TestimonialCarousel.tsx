'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, NavArrow, PaginationDots, cardVariants, ANIMATION_LOCK_DURATION } from '@/components/shared/carouselUtils'
import icon1 from '@/images/testimonial/icon1.jpg'
import icon2 from '@/images/testimonial/icon2.png'

const testimonialData = [
  {
    id: 1,
    rating: 5,
    text: '先日、僕の恩師である先生方と飲みに行きました。トルコライスやホタテのおつまみ、ワインなどを飲んで話が盛り上がりました！',
    author: '大学生',
    avatar: icon2,
  },
  {
    id: 2,
    rating: 5,
    text: '彼女とのランチで行きました。山盛りステーキ丼は安くてボリューミーでした！とても美味しかったです！',
    author: '大学生',
    avatar: icon1,
  },
  {
    id: 3,
    rating: 5,
    text: 'チーズ好きにはたまらない!ドライカレーが辛口ですがチーズがたっぷりかかったチーズフォンデュカレー950円が美味しかったです。',
    author: '会社員',
    avatar: '/avatars/student3.jpg',
  },
] as const

const TestimonialCarousel = () => {
  const [centerIndex, setCenterIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCenterIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), ANIMATION_LOCK_DURATION)
  }, [isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCenterIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), ANIMATION_LOCK_DURATION)
  }, [isAnimating])

  const visibleItems = useMemo(() => {
    const leftIndex = centerIndex === 0 ? testimonialData.length - 1 : centerIndex - 1
    const rightIndex = centerIndex === testimonialData.length - 1 ? 0 : centerIndex + 1
    return [
      { ...testimonialData[leftIndex], position: 'left' as const },
      { ...testimonialData[centerIndex], position: 'center' as const },
      { ...testimonialData[rightIndex], position: 'right' as const },
    ]
  }, [centerIndex])

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

  return (
    <section className="py-6 md:py-12 relative bg-[#FFF7E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader color="text-primary-green">VOICE FROM CUSTOMERS</SectionHeader>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-xl md:text-3xl font-black text-primary-orange font-japanese mt-2 sm:mt-4 md:mt-6 mb-8 md:mb-10 lg:mb-12"
        >
          お客様の声
        </motion.p>
        <div className="relative max-w-6xl mx-auto">
          <div className="relative flex items-center justify-center mb-0 lg:mb-0">
            <div className="hidden lg:block absolute left-0 z-30">
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
              <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleItems.map((item) => {
                    const isCenter = item.position === 'center'
                    return (
                      <motion.div
                        key={item.id}
                        layoutId={`testimonial-${item.id}`}
                        variants={cardVariants}
                        initial="side"
                        animate={isCenter ? 'center' : 'side'}
                        onClick={() => handleCardClick(item.position)}
                        className={`flex-shrink-0 ${
                          isCenter 
                            ? 'w-[70vw] max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[420px]' 
                            : 'w-[30vw] max-w-[120px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[340px] cursor-pointer lg:block'
                        }`}
                        whileHover={!isCenter ? { scale: 0.92 } : undefined}
                      >
                        <div className="bg-white rounded-lg md:rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 lg:p-6 xl:p-8 min-h-[320px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[320px] flex flex-col">
                          <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4 md:mb-5 lg:mb-4 justify-center lg:justify-start">
                            {[...Array(item.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="#FFD700" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          <p className={`flex-1 mb-4 sm:mb-5 md:mb-6 font-japanese-body leading-relaxed text-left flex items-center ${
                            isCenter 
                              ? 'text-sm sm:text-base md:text-lg lg:text-lg text-gray-800 font-medium lg:font-normal' 
                              : 'text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium lg:font-normal'
                          }`}>
                            {item.text}
                          </p>
                          <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                              {item.avatar ? (
                                <Image src={item.avatar} alt={item.author} width={48} height={48} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-green to-primary-orange" />
                              )}
                            </div>
                            <p className={`font-bold font-japanese-body ${
                              isCenter ? 'text-xs sm:text-sm md:text-base lg:text-lg' : 'text-[10px] sm:text-xs md:text-sm'
                            }`}>{item.author}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="hidden lg:block absolute right-0 z-30">
              <NavArrow direction="right" onClick={handleNext} disabled={isAnimating} />
            </div>
          </div>

          {/* Mobile Pagination Dots */}
          <div className="lg:hidden mt-6 sm:mt-8">
            <PaginationDots
              total={testimonialData.length}
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
      </div>
    </section>
  )
}

export default TestimonialCarousel
