'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showShine, setShowShine] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Trigger shine after letters appear (0.12 * 6 letters = 0.72s + 0.3s delay)
    const shineTimer = setTimeout(() => setShowShine(true), 1000)
    
    // Exit after shine completes
    const exitTimer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = 'unset'
    }, 2000)

    return () => {
      clearTimeout(shineTimer)
      clearTimeout(exitTimer)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const letters = 'HERO,S'.split('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#FFF7E3' }}
        >
          <div
            role="status"
            aria-label="Loading Dining Your Hero's"
            className="relative"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center gap-1 sm:gap-2"
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="font-black uppercase text-primary-orange inline-block"
                  style={{
                    fontSize: 'clamp(3.5rem, 18vw, 9rem)',
                    willChange: 'transform',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Shine Effect */}
            {showShine && (
              <motion.div
                initial={{ x: '-200%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.6) 50%, transparent 80%)',
                  willChange: 'transform',
                }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
