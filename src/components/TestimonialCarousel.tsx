'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import icon1 from '@/images/testimonial/icon1.jpg'
import icon2 from '@/images/testimonial/icon2.png'

// Testimonial data
const testimonialData = [
  {
    id: 1,
    rating: 5,
    text: '先日、僕の恩師である先生方と飲みに行きました。とても美味しい料理とお酒で、話が盛り上がりました！',
    author: '長崎県立大生',
    avatar: icon2,
  },
  {
    id: 2,
    rating: 5,
    text: '彼女とのランチで行きました。山盛りステーキ丼は安くてボリューミーでした！とても美味しかったです！',
    author: '20代男性',
    avatar: icon1,
  },
  {
    id: 3,
    rating: 5,
    text: 'デートで利用しました。雰囲気も良く、料理も絶品。特にトルコライスが美味しかったです！',
    author: '会社員 25歳',
    avatar: '/avatars/student3.jpg',
  },
] as const

// Card variants for smooth animations
const cardVariants = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 30,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  side: {
    scale: 0.85,
    opacity: 0.6,
    zIndex: 10,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
}

const TestimonialCarousel = () => {
  const [centerIndex, setCenterIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCenterIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCenterIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  // Get visible items with positions
  const visibleItems = useMemo(() => {
    const leftIndex = centerIndex === 0 ? testimonialData.length - 1 : centerIndex - 1
    const rightIndex = centerIndex === testimonialData.length - 1 ? 0 : centerIndex + 1
    
    return [
      { ...testimonialData[leftIndex], position: 'left' as const, index: leftIndex },
      { ...testimonialData[centerIndex], position: 'center' as const, index: centerIndex },
      { ...testimonialData[rightIndex], position: 'right' as const, index: rightIndex },
    ]
  }, [centerIndex])

  // Click handler for side cards
  const handleCardClick = useCallback((position: 'left' | 'center' | 'right') => {
    if (isAnimating || position === 'center') return
    
    if (position === 'left') {
      handlePrev()
    } else if (position === 'right') {
      handleNext()
    }
  }, [isAnimating, handlePrev, handleNext])

  return (
    <section className="py-14 relative" style={{ backgroundColor: '#FFF7E3' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-bold text-primary-orange uppercase mb-16"
        >
          VOICE FROM CUSTOMERS
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="relative flex items-center justify-center mb-8">
            
            {/* Left Arrow */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAnimating}
              className="hidden lg:flex w-14 h-14 rounded-full border-2 border-primary-green bg-white items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg z-30 absolute left-0"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </motion.button>

            {/* Carousel Track */}
            <motion.div 
              className="relative w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-4 lg:gap-6">
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
                            ? 'w-[350px] lg:w-[420px]' 
                            : 'w-[280px] lg:w-[340px] cursor-pointer'
                        }`}
                        style={{ willChange: 'transform, opacity' }}
                        whileHover={!isCenter ? { scale: 0.9 } : undefined}
                      >
                        {/* Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 min-h-[320px] flex flex-col">
                          
                          {/* Stars */}
                          <div className="flex gap-1 mb-4">
                            {[...Array(item.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-6 h-6 lg:w-7 lg:h-7"
                                fill="#FFD700"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>

                          {/* Testimonial Text */}
                          <p 
                            className={`flex-1 mb-6 font-japanese leading-relaxed ${
                              isCenter 
                                ? 'text-base lg:text-lg text-gray-800' 
                                : 'text-sm lg:text-base text-gray-700'
                            }`}
                          >
                            {item.text}
                          </p>

                          {/* Author Info */}
                          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                              {item.avatar ? (
                                <Image
                                  src={item.avatar}
                                  alt={item.author}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-green to-primary-orange" />
                              )}
                            </div>
                            <p className={`font-bold font-japanese ${
                              isCenter ? 'text-base lg:text-lg' : 'text-sm lg:text-base'
                            }`}>
                              {item.author}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Arrow */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAnimating}
              className="hidden lg:flex w-14 h-14 rounded-full border-2 border-primary-green bg-white items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg z-30 absolute right-0"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </motion.button>

            {/* Mobile Navigation Arrows */}
            <div className="flex lg:hidden gap-4 absolute -bottom-20 left-1/2 transform -translate-x-1/2">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border-2 border-primary-green bg-white flex items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border-2 border-primary-green bg-white flex items-center justify-center hover:bg-primary-green hover:text-white transition-all shadow-lg"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>

          {/* Pagination Dots */}
          <motion.div 
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true)
                    setCenterIndex(index)
                    setTimeout(() => setIsAnimating(false), 400)
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === centerIndex
                    ? 'w-2 h-2 bg-primary-green'
                    : 'w-2 h-2 bg-gray-400 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialCarousel
