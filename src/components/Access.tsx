'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, Phone } from 'lucide-react'
import { SectionHeader } from '@/components/shared/carouselUtils'

const Access = () => {
  return (
    <section className="py-12 md:py-14 lg:py-16 relative bg-[#FFF3D4]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader color="text-primary-green">WHERE WE ARE</SectionHeader>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full order-2 lg:order-1"
          >
            <div className="relative w-full aspect-video lg:aspect-[4/3] lg:h-full rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d830.5929537795166!2d129.6672944!3d33.1886763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356a950ea524a1c5%3A0x7975e33a2f465155!2sDining%20your%20HERO%2Cs!5e0!3m2!1sen!2sjp!4v1734567890123!5m2!1sen!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dining your HERO,s Location"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full order-1 lg:order-2"
          >
            <div className="bg-white rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6">
              
              <div className="flex items-start gap-3 md:gap-4">
                <MapPin size={24} className="text-primary-green mt-0.5 flex-shrink-0 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2} />
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 font-japanese">
                    〒858-0914
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 font-japanese leading-relaxed">
                    長崎県佐世保市川下町173-1
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 md:mt-2 font-japanese">
                    ※駐車場はございません、近隣のコインパーキングを利用ください
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <Calendar size={24} className="text-primary-green mt-0.5 flex-shrink-0 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 font-japanese">
                    定休日：水曜日
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 md:mt-2 font-japanese">
                    ※営業時間・定休日は変更となる場合がございますので、ご来店前に店舗にご確認ください。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <Clock size={24} className="text-primary-green mt-0.5 flex-shrink-0 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base md:text-lg text-gray-900 font-japanese leading-relaxed">
                    11:30 - 15:30 (L.O. 15:00)
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-900 font-japanese leading-relaxed">
                    17:30 - 22:00 (L.O. 21:30)
                  </p>
                </div>
              </div>

              <div className="pt-4 md:pt-6 border-t border-gray-200">
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 font-japanese">
                  ご予約・お問い合わせ
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <Phone size={24} className="text-primary-green flex-shrink-0 sm:w-6 sm:h-6 md:w-7 md:h-7" strokeWidth={2} />
                  <a
                    href="tel:090-9582-0863"
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-orange hover:opacity-80 transition-colors"
                  >
                    090-9582-0863
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Access
