'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChefHat, Heart, School } from 'lucide-react'
import bentouImage from '@/images/bentou/bentou.jpg'

const Bentou = () => {
  return (
    <section className="py-6 md:py-12 relative" style={{ backgroundColor: '#FFF7E3' }}>
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
            BENTO & CATERING
          </h2>
          <p className="text-xl md:text-3xl font-black text-primary-green font-japanese mt-2 sm:mt-4 md:mt-6">
            手作り弁当・オードブル承ります
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
              src={bentouImage}
              alt="手作り弁当・オードブル - ヒーローズの特製弁当・パーティー用オードブル"
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
              <h3 className="text-xl md:text-3xl font-bold text-primary-green mb-6 text-center">
                【テイクアウトのご案内】
              </h3>
              
              <div className="space-y-6 text-black">

                <div className="flex items-center gap-4">
                    <ChefHat size={50} className="text-primary-green flex-shrink-0" strokeWidth={1.5} />
                    <p className="text-base md:text-lg font-bold text-red-600">
                        弁当 500円〜 <br /> オードブル 6,000円〜
                    </p>
                </div>

                <div className="flex items-center gap-4">
                  <Heart size={50} className="text-primary-green flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-base md:text-lg leading-relaxed font-medium">
                    お客様の予算と食べたいものをお聞きして、一つ一つ丁寧にお作りします。
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <School size={50} className="text-primary-green flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-base md:text-lg leading-relaxed font-medium">
                    イベントや学校行事でぜひ利用してください！
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-200">
                  <p className="text-sm md:text-base font-japanese-body text-left">
                    学校行事からイベント、ご家族の集まりまで、長年多くのお客様にご利用いただいております。人数や予算に合わせて柔軟に対応します、まずは気軽にご相談ください！
                  </p>
                  <p className="text-xs text-gray-500 mt-3 font-japanese-body">
                    ※出前は基本やっていないので、別途相談をお願いします。
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

export default Bentou
