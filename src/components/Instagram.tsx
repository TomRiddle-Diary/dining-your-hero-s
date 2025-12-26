'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { Instagram as InstagramIcon, Facebook, Twitter } from 'lucide-react'

const Instagram = () => {
  // REPLACE THESE with actual Instagram post URLs from @hirotakaira
  // Example: https://www.instagram.com/p/ABC123xyz/
  const instagramPosts = [
    'https://www.instagram.com/p/DOPxlA1D9MB/?img_index=1',
    'https://www.instagram.com/p/DIr2WKFhuq1/?img_index=1',
    'https://www.instagram.com/p/DCPxstBSB8_/?img_index=1',
    'https://www.instagram.com/p/C-L6JW4Kcvj/',
  ]

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    
    script.onload = () => {
      // Process embeds after script loads
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process()
      }
    }
    
    document.body.appendChild(script)

    // Process embeds if script already loaded
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }

    // Don't remove the script on cleanup - Instagram needs it to stay
    return () => {
      // Clean up if needed, but keep the script
    }
  }, [])

  return (
    <section className="py-6 md:py-12  relative" style={{ backgroundColor: '#FFF3D4' }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-bold text-primary-orange uppercase"
        >
          KEEP IN TOUCH WITH HERO'S
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-xl md:text-3xl font-black text-primary-green mt-2 sm:mt-4 md:mt-6 mb-8 md:mb-10 lg:mb-12 font-japanese"
        >
          最新情報をチェック
        </motion.p>

        {/* Instagram Carousel */}
        <div className="relative max-w-6xl mx-auto mb-8">
          <div className="relative flex items-center justify-center">
            {/* Mobile: 1 post static */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:hidden w-full flex justify-center"
            >
              <div className="w-full max-w-[400px] h-[600px] rounded-xl shadow-lg mx-auto">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={instagramPosts[0]}
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: '0',
                    borderRadius: '12px',
                    margin: '0',
                    maxWidth: '540px',
                    minWidth: '326px',
                    padding: '0',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div style={{ padding: '16px' }}>
                    <Link 
                      href={instagramPosts[0]}
                      target="_blank"
                      style={{
                        background: '#FFFFFF',
                        lineHeight: '0',
                        padding: '40px 0',
                        textAlign: 'center',
                        textDecoration: 'none',
                        width: '100%',
                      }}
                    >
                      View this post on Instagram
                    </Link>
                  </div>
                </blockquote>
              </div>
            </motion.div>

            {/* Desktop: Show all 4 posts */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-4">
                {instagramPosts.map((postUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="flex justify-center h-[600px] rounded-xl shadow-lg"
                  >
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={postUrl}
                      data-instgrm-version="14"
                      style={{
                        background: '#FFF',
                        border: '0',
                        borderRadius: '12px',
                        margin: '0',
                        maxWidth: '540px',
                        minWidth: '326px',
                        padding: '0',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <div style={{ padding: '16px' }}>
                        <Link 
                          href={postUrl}
                          target="_blank"
                          style={{
                            background: '#FFFFFF',
                            lineHeight: '0',
                            padding: '40px 0',
                            textAlign: 'center',
                            textDecoration: 'none',
                            width: '100%',
                          }}
                        >
                          View this post on Instagram
                        </Link>
                      </div>
                    </blockquote>
                  </motion.div>
                ))}
              </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-8"
        >
          <Link 
            href="https://www.instagram.com/hirotakaira/" 
            target="_blank"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 5 }} 
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-primary-green hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <InstagramIcon size={36} className="text-primary-green group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </motion.div>
          </Link>
          <Link 
            href="https://www.facebook.com/profile.php?id=100011514402994" 
            target="_blank"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: -5 }} 
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-primary-green hover:bg-blue-600 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <Facebook size={36} className="text-primary-green group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </motion.div>
          </Link>
          <Link 
            href="https://twitter.com" 
            target="_blank"
            className="block"
          >
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 5 }} 
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-primary-green hover:bg-sky-500 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <Twitter size={36} className="text-primary-green group-hover:text-white transition-colors duration-300" strokeWidth={2} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Instagram
