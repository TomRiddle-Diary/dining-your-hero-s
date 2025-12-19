'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Shared animation config for consistency across all components
export const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
}

export const ANIMATION_LOCK_DURATION = 400

// Shared card variants
export const cardVariants = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 30,
    transition: SPRING_CONFIG,
  },
  side: {
    scale: 0.75,
    opacity: 0.8,
    zIndex: 10,
    transition: SPRING_CONFIG,
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

// Shared Section Header Component
export const SectionHeader = ({ children, color = 'text-primary-orange' }: { children: React.ReactNode; color?: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className={`text-center text-3xl md:text-4xl lg:text-5xl font-bold ${color} uppercase mb-8 md:mb-12 lg:mb-16 px-4`}
  >
    {children}
  </motion.h2>
)

// Shared Navigation Arrow Component
interface NavArrowProps {
  direction: 'left' | 'right'
  onClick: () => void
  disabled?: boolean
  className?: string
}

export const NavArrow = ({ direction, onClick, disabled, className = '' }: NavArrowProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    disabled={disabled}
    className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-primary-green bg-white flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    aria-label={direction === 'left' ? 'Previous' : 'Next'}
  >
    {direction === 'left' ? (
      <ChevronLeft size={24} strokeWidth={2.5} className="md:w-7 md:h-7" />
    ) : (
      <ChevronRight size={24} strokeWidth={2.5} className="md:w-7 md:h-7" />
    )}
  </motion.button>
)

// Pagination Dots Component
interface PaginationDotsProps {
  total: number
  activeIndex: number
  onDotClick: (index: number) => void
  disabled?: boolean
}

export const PaginationDots = ({ total, activeIndex, onDotClick, disabled }: PaginationDotsProps) => (
  <motion.div
    className="flex items-center justify-center gap-2 mt-6 md:mt-8"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.5 }}
  >
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        disabled={disabled}
        className={`transition-all duration-300 rounded-full ${
          index === activeIndex
            ? 'w-6 h-2 md:w-8 md:h-3 bg-primary-green'
            : 'w-2 h-2 md:w-3 md:h-3 bg-gray-400 hover:bg-gray-500'
        }`}
        aria-label={`Go to item ${index + 1}`}
      />
    ))}
  </motion.div>
)
