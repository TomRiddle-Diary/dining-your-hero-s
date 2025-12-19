'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import logo from '@/images/logo.svg'

const Footer = () => {
  return (
    <footer className="bg-primary-green py-6 relative">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* Three-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          
          {/* Left Column - Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center md:justify-start items-center"
          >
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image 
                src={logo} 
                alt="Dining Your Hero,s" 
                width={170} 
                height={95}
              />
            </Link>
          </motion.div>

          {/* Center Column - Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <Link 
              href="#"
              className="text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              MENU
            </Link>
            <Link 
              href="#"
              className="text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              ABOUT US
            </Link>
            <Link 
              href="#"
              className="text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              CONTACT
            </Link>
            <Link 
              href="/privacy_policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold uppercase tracking-wide hover:opacity-80 transition-opacity"
              style={{ color: '#EEF5D3' }}
            >
              PRIVACY POLICY
            </Link>
          </motion.div>

          {/* Right Column - Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center md:justify-end items-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#"
                className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Instagram size={36} style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#"
                className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Facebook size={36} style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#"
                className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-sky-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Twitter size={36} style={{ color: '#EEF5D3' }} strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center pt-8 border-t border-[#EEF5D3]/30"
        >
          <p 
            className="text-sm md:text-base"
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
