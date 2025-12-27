'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import heroImage from '@/images/hero/hero-image3.webp'

const TRANSITIONS = {
  fadeInLeft: { duration: 0.8, ease: 'easeOut' },
  fadeInScale: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
  fadeInUp: { duration: 0.6 },
  hover: { duration: 0.3 },
}

const Hero = () => {
  return (
    <section className="flex items-center bg-[#FFF7E3] py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 sm:gap-10 lg:gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={TRANSITIONS.fadeInLeft}
            className="space-y-2 sm:space-y-4 lg:space-y-8 text-center lg:text-left order-2 lg:order-1 w-full"
          >
            <h1 className="text-primary-green">
              <motion.span 
                className="block font-black leading-tight text-[clamp(2.5rem,10vw,5.5rem)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ...TRANSITIONS.fadeInUp }}
              >
                WELCOME TO
              </motion.span>
              <motion.span 
                className="block font-black leading-tight text-[clamp(2.5rem,10vw,5.5rem)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ...TRANSITIONS.fadeInUp }}
              >
                HERO&apos;S
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...TRANSITIONS.fadeInUp }}
            >
              <Link 
                href="#"
                className="inline-block bg-primary-green text-white font-bold text-[clamp(1rem,3vw,1.5rem)] px-8 sm:px-10 lg:px-12 py-2.5 sm:py-3 rounded-full hover:bg-opacity-90 transition-all hover:scale-105 uppercase tracking-wide shadow-lg"
                style={{ boxShadow: '1px 4px 0 0 #00AA76' }}
              >
                ORDER NOW
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
            animate={{ opacity: 1, scale: 1.2, rotate: -12 }}
            transition={TRANSITIONS.fadeInScale}
            className="relative w-full flex items-center justify-center order-1 lg:order-2"
          >
            <motion.div 
              className="relative w-full aspect-video"
              whileHover={{ scale: 1.02 }}
              transition={TRANSITIONS.hover}
            >
              <Image
                src={heroImage}
                alt="Delicious katsu curry with pasta"
                fill
                className="object-cover rounded-2xl"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
