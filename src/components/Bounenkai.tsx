'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Store, Users, CigaretteOff } from 'lucide-react'
import cheersImage from '@/images/bounenkai/cheers.webp'

const Bounenkai = () => {
  return (
    <section className="py-6 md:py-12 relative" style={{ backgroundColor: '#FFF3D4' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10 lg:mb-12 "
        >
          <h2 className="text-4xl lg:text-5xl font-bold uppercase text-primary-orange">
            HOST YOUR PARTY
          </h2>
          <p className="text-xl md:text-3xl font-black text-primary-green font-japanese mt-2 sm:mt-4 md:mt-6">
            佐世保で飲み会・忘年会ならヒーローズへ！
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center max-w-5xl mx-auto">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-square max-w-md mx-auto rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={cheersImage}
              alt="忘年会・新年会 - ヒーローズで乾杯"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right Side - Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto flex items-center"
          >
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md font-japanese w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-green mb-6 text-center">
                【お席のご案内】
              </h3>
              
              <div className="space-y-6 text-black">

                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Store size={50} className="text-primary-green flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-base md:text-lg font-bold text-red-600">
                        貸切OK！
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Users size={50} className="text-primary-green flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-base md:text-lg leading-relaxed font-medium">
                    着席時25名、立食時35名最大まで可能です。
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <CigaretteOff size={50} className="text-primary-green flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-base md:text-lg leading-relaxed font-medium">
                    全席禁煙ですので、お子様連れでも安心してお越しください。
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-200">
                  <p className="text-sm md:text-base font-japanese-body text-left">
                    『今年の忘年会、どうしよう？』とお悩みの幹事様。 2〜3名様の小さな集まりから、お店を貸し切った大きなパーティまで、 人数に合わせた最適なプランをご提案します。まずは気軽にお電話ください！
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Bounenkai
