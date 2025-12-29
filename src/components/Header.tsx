'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Facebook, Twitter, Menu, X } from 'lucide-react'
import logo from '@/images/logo.svg'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-primary-green relative z-50"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Social Icons - Desktop Only */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="https://www.instagram.com/hirotakaira/" 
                target="_blank" 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Instagram size={28} style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="https://www.facebook.com/profile.php?id=100011514402994" 
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
              width={140} 
              height={78}
              className="md:w-[170px] md:h-[95px]"
              priority
            />
          </Link>

          {/* Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/menu" 
              className="font-bold text-xl tracking-wide hover:opacity-80 transition-opacity" style={{color: '#EEF5D3'}}
            >
              MENU
            </Link>
            <Link 
              href="/about" 
              className="font-bold text-xl tracking-wide hover:opacity-80 transition-opacity" style={{color: '#EEF5D3'}}
            >
              ABOUT US
            </Link>
            <Link 
              href="/contact" 
              className="font-bold text-xl tracking-wide hover:opacity-80 transition-opacity" style={{color: '#EEF5D3'}}
            >
              CONTACT
            </Link>
          </nav>

          {/* Hamburger Menu Button - Mobile Only */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={28} style={{ color: '#EEF5D3' }} strokeWidth={2} />
            ) : (
              <Menu size={28} style={{ color: '#EEF5D3' }} strokeWidth={2} />
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-primary-green z-50 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10"
                >
                  <X size={24} style={{ color: '#EEF5D3' }} strokeWidth={2} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-6 mb-8">
                <Link 
                  href="/menu" 
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-2xl tracking-wide hover:opacity-80 transition-opacity py-2 border-b border-white/20" 
                  style={{color: '#EEF5D3'}}
                >
                  MENU
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-2xl tracking-wide hover:opacity-80 transition-opacity py-2 border-b border-white/20" 
                  style={{color: '#EEF5D3'}}
                >
                  ABOUT US
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-2xl tracking-wide hover:opacity-80 transition-opacity py-2 border-b border-white/20" 
                  style={{color: '#EEF5D3'}}
                >
                  CONTACT
                </Link>
              </nav>

              {/* Social Icons */}
              <div className="mt-auto">
                <p className="text-sm font-bold mb-4" style={{color: '#EEF5D3'}}>FOLLOW US</p>
                <div className="flex items-center gap-4">
                  <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="https://instagram.com" 
                      target="_blank"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300"
                    >
                      <Instagram size={24} style={{ color: '#EEF5D3' }} strokeWidth={2} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="https://facebook.com" 
                      target="_blank"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-blue-600 transition-all duration-300"
                    >
                      <Facebook size={24} style={{ color: '#EEF5D3' }} strokeWidth={2} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="https://twitter.com" 
                      target="_blank"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-sky-500 transition-all duration-300"
                    >
                      <Twitter size={24} style={{ color: '#EEF5D3' }} strokeWidth={2} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
