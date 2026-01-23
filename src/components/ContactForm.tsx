'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { SectionHeader } from '@/components/shared/carouselUtils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-[#FFF3D4]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader color="text-primary-green">CONTACT US</SectionHeader>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-xl md:text-3xl font-black text-primary-orange mt-2 sm:mt-4 md:mt-6 mb-8 md:mb-10 lg:mb-12 font-japanese"
        >
          お問い合わせ
        </motion.p>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl md:rounded-2xl shadow-md p-6 sm:p-8 md:p-10 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                >
                  お名前 <span className="text-primary-orange">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-all font-japanese-body ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary-green'
                  }`}
                  aria-label="お名前"
                  aria-required="true"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 font-japanese-body">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                >
                  メールアドレス <span className="text-primary-orange">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-all font-japanese-body ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary-green'
                  }`}
                  aria-label="メールアドレス"
                  aria-required="true"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 font-japanese-body">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                >
                  電話番号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green transition-all font-japanese-body"
                  aria-label="電話番号"
                />
              </div>

              {/* Message Field */}
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                >
                  お問い合わせ内容 <span className="text-primary-orange">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-all resize-none font-japanese-body placeholder:text-xs md:placeholder:text-sm ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary-green'
                  }`}
                  placeholder={`メニューの追加希望、ご質問、改善案など、お気軽にお聞かせください。\n※こちらからのご予約は承っておりませんので、お電話にてお願いいたします。`}
                  aria-label="お問い合わせ内容"
                  aria-required="true"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 font-japanese-body">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`w-full bg-primary-green text-white font-black text-lg md:text-xl px-8 py-4 rounded-full transition-all shadow-lg font-japanese flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-opacity-90'
                  }`}
                  style={!isSubmitting ? { boxShadow: '1px 4px 0 0 #00AA76' } : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      送信中...
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      送信する
                    </>
                  )}
                </motion.button>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border-2 border-green-500 rounded-lg"
                >
                  <p className="text-green-800 font-bold text-center font-japanese-body">
                    お問い合わせを受け付けました。ありがとうございます！
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border-2 border-red-500 rounded-lg"
                >
                  <p className="text-red-800 font-bold text-center font-japanese-body">
                    送信に失敗しました。もう一度お試しください。
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
