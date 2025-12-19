'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import logo from '@/images/logo.svg'

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-primary-green relative z-10"
    >
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="https://instagram.com" 
              target="_blank" 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Instagram size={28} style={{ color: '#EEF5D3' }} strokeWidth={2} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="https://facebook.com" 
              target="_blank" 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Facebook size={28} style={{ color: '#EEF5D3' }} strokeWidth={2} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="https://twitter.com" 
              target="_blank" 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-sky-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Twitter size={28} style={{ color: '#EEF5D3' }} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>

        {/* Logo */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Image 
            src={logo} 
            alt="Dining Your Hero,s" 
            width={170} 
            height={95}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link 
            href="/menu" 
            className="font-bold text-xl tracking-wide hover:text-primary-orange transition-colors" style={{color: '#EEF5D3'}}
          >
            MENU
          </Link>
          <Link 
            href="/about" 
            className="font-bold text-xl tracking-wide hover:text-primary-orange transition-colors" style={{color: '#EEF5D3'}}
          >
            ABOUT US
          </Link>
          <Link 
            href="/contact" 
            className="font-bold text-xl tracking-wide hover:text-primary-orange transition-colors" style={{color: '#EEF5D3'}}
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
