'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, Phone } from 'lucide-react'

const Access = () => {
  return (
    <section className="py-14 relative" style={{ backgroundColor: '#FFF3D4' }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-bold text-primary-green uppercase mb-16"
        >
          WHERE WE ARE
        </motion.h2>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full h-full"
          >
            <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
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

          {/* Right Column - Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 h-full flex flex-col justify-center space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MapPin size={28} className="text-primary-green" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-lg lg:text-xl font-bold text-gray-900 mb-2 font-japanese">
                    〒858-0914
                  </p>
                  <p className="text-base lg:text-lg text-gray-800 font-japanese leading-relaxed">
                    長崎県佐世保市川下町173-1
                  </p>
                  <p className="text-sm text-gray-600 mt-2 font-japanese">
                    ※駐車場はございません、近隣のコインパーキングを利用ください
                  </p>
                </div>
              </div>

              {/* Regular Holiday */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Calendar size={28} className="text-primary-green" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-base lg:text-lg font-bold text-gray-900 font-japanese">
                    定休日：水曜日
                  </p>
                  <p className="text-sm text-gray-600 mt-2 font-japanese">
                    ※営業時間・定休日は変更となる場合がございますので、ご来店前に店舗にご確認ください。
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Clock size={28} className="text-primary-green" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-base lg:text-lg text-gray-900 font-japanese leading-relaxed">
                    11:30 - 15:30 (L.O. 15:00)
                  </p>
                  <p className="text-base lg:text-lg text-gray-900 font-japanese leading-relaxed">
                    17:30 - 22:00 (L.O. 21:30)
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-base lg:text-lg font-bold text-gray-900 mb-4 font-japanese">
                  ご予約・お問い合わせ
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Phone size={28} className="text-primary-green" strokeWidth={2} />
                  </div>
                  <a
                    href="tel:090-9582-0863"
                    className="text-2xl lg:text-4xl font-bold text-primary-orange hover:opacity-80 transition-colors"
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
