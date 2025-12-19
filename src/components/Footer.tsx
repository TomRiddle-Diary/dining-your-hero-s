'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import logo from '@/images/logo.svg'

const Footer = () => {
  return (
    <footer className="bg-primary-green py-8 md:py-10 lg:py-12 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="flex flex-col items-center gap-6 md:gap-8 mb-6 md:mb-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center items-center"
          >
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image 
                src={logo} 
                alt="Dining Your Hero,s" 
                width={140} 
                height={78}
                className="sm:w-[160px] sm:h-[90px] md:w-[170px] md:h-[95px]"
              />
            </Link>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8"
          >
            <Link 
              href="#"
              className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              MENU
            </Link>
            <Link 
              href="#"
              className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              ABOUT US
            </Link>
            <Link 
              href="#"
              className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              CONTACT
            </Link>
            <Link 
              href="/privacy_policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              PRIVACY
            </Link>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center items-center gap-4 md:gap-6"
          >
            <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#"
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 shadow-lg"
              >
                <Instagram className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#"
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-blue-600 transition-all duration-300 shadow-lg"
              >
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#"
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-sky-500 transition-all duration-300 shadow-lg"
              >
                <Twitter className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center pt-6 md:pt-8 border-t border-[#EEF5D3]/30"
        >
          <p 
            className="text-xs sm:text-sm md:text-base"
            style={{ color: '#EEF5D3' }}
          >
            ©2025 Dining Your HERO,S ALL Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
