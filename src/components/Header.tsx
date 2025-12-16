'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-primary-green sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <Link href="https://instagram.com" target="_blank" className="hover:opacity-80 transition-opacity">
            <i className="fa-brands fa-instagram text-white text-3xl" style={{color: '#EEF5D3'}} aria-hidden="true"></i>
          </Link>
          <Link href="https://facebook.com" target="_blank" className="hover:opacity-80 transition-opacity">
            <i className="fa-brands fa-facebook text-white text-3xl" style={{color: '#EEF5D3'}} aria-hidden="true"></i>
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:opacity-80 transition-opacity">
            <i className="fa-brands fa-x-twitter text-white text-3xl" style={{color: '#EEF5D3'}} aria-hidden="true"></i>
          </Link>
        </div>

        {/* Logo */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Image 
            src="/logo.svg" 
            alt="Dining Your Hero,s" 
            width={140} 
            height={78}
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
