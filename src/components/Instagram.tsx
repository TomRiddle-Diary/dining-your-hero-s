'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { Instagram as InstagramIcon, Facebook, Twitter } from 'lucide-react'
import { PaginationDots, NavArrow } from '@/components/shared/carouselUtils'

const Instagram = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // REPLACE THESE with actual Instagram post URLs from @hirotakaira
  // Example: https://www.instagram.com/p/ABC123xyz/
  const instagramPosts = [
    'https://www.instagram.com/p/DOPxlA1D9MB/?img_index=1',
    'https://www.instagram.com/p/DIr2WKFhuq1/?img_index=1',
    'https://www.instagram.com/p/DCPxstBSB8_/?img_index=1',
    'https://www.instagram.com/p/C-L6JW4Kcvj/',
  ]

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? instagramPosts.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, instagramPosts.length])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === instagramPosts.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, instagramPosts.length])

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

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    
    script.onload = () => {
      // Process embeds after script loads
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process()
      }
    }
    
    document.body.appendChild(script)

    // Process embeds if script already loaded
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }

    // Don't remove the script on cleanup - Instagram needs it to stay
    return () => {
      // Clean up if needed, but keep the script
    }
  }, [])

  return (
    <section className="py-6 md:py-12  relative" style={{ backgroundColor: '#FFF3D4' }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-bold text-primary-orange uppercase mb-12"
        >
          KEEP IN TOUCH WITH HERO,S
        </motion.h2>

        {/* Instagram Carousel */}
        <div className="relative max-w-6xl mx-auto mb-8">
          <div className="relative flex items-center justify-center">
            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:block absolute left-0 z-20">
              <NavArrow direction="left" onClick={handlePrev} disabled={isAnimating} />
            </div>

            {/* Carousel Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              {/* Mobile: 1 post, Tablet: 2 posts, Desktop: 4 posts */}
              <div className="lg:hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center px-4"
                  >
                    <div className="w-full max-w-[400px] h-[600px] rounded-xl shadow-lg">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={instagramPosts[currentIndex]}
                        data-instgrm-version="14"
                        style={{
                          background: '#FFF',
                          border: '0',
                          borderRadius: '12px',
                          margin: '0',
                          maxWidth: '540px',
                          minWidth: '326px',
                          padding: '0',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <div style={{ padding: '16px' }}>
                          <Link 
                            href={instagramPosts[currentIndex]}
                            target="_blank"
                            style={{
                              background: '#FFFFFF',
                              lineHeight: '0',
                              padding: '40px 0',
                              textAlign: 'center',
                              textDecoration: 'none',
                              width: '100%',
                            }}
                          >
                            View this post on Instagram
                          </Link>
                        </div>
                      </blockquote>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop: Show all 4 posts */}
              <div className="hidden lg:grid lg:grid-cols-4 gap-4">
                {instagramPosts.map((postUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="flex justify-center h-[600px] rounded-xl shadow-lg"
                  >
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={postUrl}
                      data-instgrm-version="14"
                      style={{
                        background: '#FFF',
                        border: '0',
                        borderRadius: '12px',
                        margin: '0',
                        maxWidth: '540px',
                        minWidth: '326px',
                        padding: '0',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <div style={{ padding: '16px' }}>
                        <Link 
                          href={postUrl}
                          target="_blank"
                          style={{
                            background: '#FFFFFF',
                            lineHeight: '0',
                            padding: '40px 0',
                            textAlign: 'center',
                            textDecoration: 'none',
                            width: '100%',
                          }}
                        >
                          View this post on Instagram
                        </Link>
                      </div>
                    </blockquote>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:block absolute right-0 z-20">
              <NavArrow direction="right" onClick={handleNext} disabled={isAnimating} />
            </div>
          </div>

          {/* Mobile Pagination Dots */}
          <div className="lg:hidden mt-6 sm:mt-8">
            <PaginationDots 
              total={instagramPosts.length}
              activeIndex={currentIndex}
              onDotClick={(index) => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }
              }}
              disabled={isAnimating}
            />
          </div>
        </div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-8"
        >
          <Link 
            href="https://www.instagram.com/hirotakaira/" 
            target="_blank"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 5 }} 
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-primary-green hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <InstagramIcon size={36} className="text-primary-green group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </motion.div>
          </Link>
          <Link 
            href="https://facebook.com" 
            target="_blank"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: -5 }} 
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-primary-green hover:bg-blue-600 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <Facebook size={36} className="text-primary-green group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </motion.div>
          </Link>
          <Link 
            href="https://twitter.com" 
            target="_blank"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 5 }} 
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-primary-green hover:bg-sky-500 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <Twitter size={36} className="text-primary-green group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Instagram
