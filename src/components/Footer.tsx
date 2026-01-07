'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'
import logo from '@/images/logo.svg'

const Footer = () => {
  return (
    <footer className="bg-primary-green py-4 md:py-6 lg:py-8 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Main Content - Mobile: Vertical Stack, Desktop: Three Columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 mb-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start"
        >
          
          {/* Left Column - Logo */}
          <div className="flex justify-center lg:justify-start">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image 
                src={logo} 
                alt="ヒーローズ(Dining Your Hero'sSロゴ 佐世保・川下町の洋食居酒屋" 
                width={160} 
                height={90}
                className="w-[140px] h-auto sm:w-[160px] md:w-[180px]"
              />
            </Link>
          </div>

          {/* Center Column - Navigation Links */}
          <nav className="flex flex-col items-center gap-3 md:gap-4">
            <Link 
              href="/menu"
              className="text-base sm:text-lg md:text-2xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              MENU
            </Link>
            <Link 
              href="/about"
              className="text-base sm:text-lg md:text-2xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              ABOUT US
            </Link>
            <Link 
              href="/about"
              className="text-base sm:text-lg md:text-2xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              CONTACT
            </Link>
            <Link 
              href="/privacy_policy.pdf"
              target="_blank"
              className="text-base sm:text-lg md:text-2xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              PRIVACY
            </Link>
          </nav>

          {/* Right Column - Social Icons */}
          <div className="flex justify-center items-center gap-4 md:gap-6 lg:justify-end">
            <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="https://www.instagram.com/hirotakaira/"
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 shadow-lg"
              >
                <Instagram className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="https://www.facebook.com/profile.php?id=100011514402994"
                target="_blank"
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-blue-600 transition-all duration-300 shadow-lg"
              >
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Copyright - Full Width Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center pt-6 md:pt-8 border-t border-[#EEF5D3]/30"
        >
          <p 
            className="text-xs sm:text-sm md:text-base"
            style={{ color: '#EEF5D3' }}
          >
            ©2025 Dining Your HERO&apos;S ALL Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
