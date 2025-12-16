'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import heroImage from '@/images/hero-image.png'

const Hero = () => {
  return (
    <section className="bg-cream min-h-[calc(100vh-88px)] flex items-center">
      <div className="max-w-6xl mx-auto px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-10"
          >
            <h1 className="text-primary-green">
              <motion.span 
                className="block text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                EAT
              </motion.span>
              <motion.span 
                className="block text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                LIKE HERO,S
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link 
                href="/order"
                className="inline-block bg-primary-green font-bold text-2xl px-12 py-3 rounded-full hover:bg-opacity-90 transition-all hover:scale-105 uppercase tracking-wide"
                style={{color: '#FFFFFF', boxShadow: '1px 4px 0 0 #00AA76'}}
              >
                ORDER NOW
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Food Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <motion.div 
              className="relative w-[550px] h-[550px] rounded-full overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-white rounded-full">
                <Image
                  src={heroImage}
                  alt="Delicious katsu curry with pasta"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 550px"
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
