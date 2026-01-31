'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { SectionHeader } from '@/components/shared/carouselUtils';

type FormType = 'inquiry' | 'reservation';

interface FormData {
  formType: FormType;
  name: string;
  email: string;
  phone: string;
  message: string;
  // 予約フィールド
  reservationDate?: string;
  reservationTime?: string;
  numberOfPeople?: string;
  needsCourse?: boolean;
  allergies?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  reservationDate?: string;
  reservationTime?: string;
  numberOfPeople?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    formType: 'reservation',
    name: '',
    email: '',
    phone: '',
    message: '',
    reservationDate: '',
    reservationTime: '',
    numberOfPeople: '',
    needsCourse: false,
    allergies: '',
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

    // 予約の場合の追加バリデーション
    if (formData.formType === 'reservation') {
      if (!formData.phone?.trim()) {
        newErrors.phone = '予約には電話番号が必要です';
      }

      if (!formData.reservationDate?.trim()) {
        newErrors.reservationDate = '予約日を選択してください';
      } else {
        // 水曜日（定休日）のチェック
        const selectedDate = new Date(formData.reservationDate);
        if (selectedDate.getDay() === 3) {
          newErrors.reservationDate = '水曜日は定休日です。別の日付を選択してください。';
        }
      }

      if (!formData.reservationTime?.trim()) {
        newErrors.reservationTime = '予約時間を選択してください';
      }

      if (!formData.numberOfPeople?.trim()) {
        newErrors.numberOfPeople = '人数を入力してください';
      } else if (parseInt(formData.numberOfPeople) < 1) {
        newErrors.numberOfPeople = '1名以上で入力してください';
      }
    }

    // お問い合わせの場合のバリデーション
    if (formData.formType === 'inquiry' && !formData.message.trim()) {
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
      setFormData({ 
        formType: 'inquiry',
        name: '', 
        email: '', 
        phone: '', 
        message: '',
        reservationDate: '',
        reservationTime: '',
        numberOfPeople: '',
        needsCourse: false,
        allergies: '',
      });
      setErrors({});
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // 予約日の水曜日チェック
    if (name === 'reservationDate' && value) {
      const selectedDate = new Date(value);
      if (selectedDate.getDay() === 3) {
        setErrors(prev => ({ 
          ...prev, 
          reservationDate: '水曜日は定休日です。別の日付を選択してください。' 
        }));
        return;
      }
    }
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormTypeChange = (type: FormType) => {
    setFormData(prev => ({ ...prev, formType: type }));
    setErrors({});
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-[#FFF7E3]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader color="text-primary-green">CONTACT US</SectionHeader>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-xl md:text-3xl font-black text-primary-orange mt-2 sm:mt-4 md:mt-6 mb-4 md:mb-6 font-japanese"
        >
          お問い合わせ・ご予約
        </motion.p>

        {/* 注意書き */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-3xl mx-auto mb-8 md:mb-10 bg-amber-50 border-2 border-primary-orange/30 rounded-lg p-4 md:p-6"
        >
          <p className="text-sm md:text-base text-gray-800 font-japanese-body leading-relaxed">
            <span className="font-bold text-primary-green">【ご予約について】</span><br />
            • ご予約はなるべく<span className="font-bold">前日まで</span>にお願いします。<br />
            • 当日のご予約は<span className="font-bold">お電話</span>にてお願いします。<br />
            <span className="text-xs md:text-sm text-gray-600">※当日はお電話に出られない場合がございますので、予めご了承ください。</span>
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl md:rounded-2xl shadow-md p-6 sm:p-8 md:p-10 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Type Selection */}
              <div>
                <label className="block text-sm md:text-base font-bold text-gray-900 mb-3 font-japanese-body">
                  お問い合わせ項目 <span className="text-primary-orange">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="formType"
                      value="reservation"
                      checked={formData.formType === 'reservation'}
                      onChange={() => handleFormTypeChange('reservation')}
                      className="w-4 h-4 md:w-5 md:h-5 text-primary-green focus:ring-primary-green/50"
                    />
                    <span className="ml-2 text-sm md:text-base font-japanese-body">ご予約</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="formType"
                      value="inquiry"
                      checked={formData.formType === 'inquiry'}
                      onChange={() => handleFormTypeChange('inquiry')}
                      className="w-4 h-4 md:w-5 md:h-5 text-primary-green focus:ring-primary-green/50"
                    />
                    <span className="ml-2 text-sm md:text-base font-japanese-body">お問い合わせ</span>
                  </label>
                </div>
              </div>

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
                  電話番号 {formData.formType === 'reservation' && <span className="text-primary-orange">*</span>}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-all font-japanese-body ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary-green'
                  }`}
                  aria-label="電話番号"
                  aria-required={formData.formType === 'reservation'}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 font-japanese-body">{errors.phone}</p>
                )}
              </div>

              {/* 予約フィールド */}
              {formData.formType === 'reservation' && (
                <>
                  {/* 予約日 */}
                  <div>
                    <label 
                      htmlFor="reservationDate" 
                      className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                    >
                      予約日 <span className="text-primary-orange">*</span>
                    </label>
                    <input
                      type="date"
                      id="reservationDate"
                      name="reservationDate"
                      value={formData.reservationDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-all font-japanese-body ${
                        errors.reservationDate 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-primary-green'
                      }`}
                      aria-label="予約日"
                      aria-required="true"
                    />
                    {errors.reservationDate && (
                      <p className="mt-1 text-sm text-red-600 font-japanese-body">{errors.reservationDate}</p>
                    )}
                  </div>

                  {/* 予約時間 */}
                  <div>
                    <label 
                      htmlFor="reservationTime" 
                      className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                    >
                      予約時間 <span className="text-primary-orange">*</span>
                    </label>
                    <select
                      id="reservationTime"
                      name="reservationTime"
                      value={formData.reservationTime}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-all font-japanese-body ${
                        errors.reservationTime 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-primary-green'
                      }`}
                      aria-label="予約時間"
                      aria-required="true"
                    >
                      <option value="">時間を選択してください</option>
                      <option value="11:30">11:30</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="14:30">14:30</option>
                      <option value="15:00">15:00</option>
                      <option value="17:30">17:30</option>
                      <option value="18:00">18:00</option>
                      <option value="18:30">18:30</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                    </select>
                    {errors.reservationTime && (
                      <p className="mt-1 text-sm text-red-600 font-japanese-body">{errors.reservationTime}</p>
                    )}
                  </div>

                  {/* 人数 */}
                  <div>
                    <label 
                      htmlFor="numberOfPeople" 
                      className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                    >
                      人数 <span className="text-primary-orange">*</span>
                    </label>
                    <input
                      type="number"
                      id="numberOfPeople"
                      name="numberOfPeople"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      min="1"
                      className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-all font-japanese-body ${
                        errors.numberOfPeople 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-primary-green'
                      }`}
                      placeholder="例: 4"
                      aria-label="人数"
                      aria-required="true"
                    />
                    {errors.numberOfPeople && (
                      <p className="mt-1 text-sm text-red-600 font-japanese-body">{errors.numberOfPeople}</p>
                    )}
                  </div>

                  {/* 宴会・パーティー・コース料理 */}
                  <div className="bg-amber-50 border-2 border-primary-orange/30 rounded-lg p-4 md:p-5">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="needsCourse"
                        checked={formData.needsCourse || false}
                        onChange={handleChange}
                        className="w-5 h-5 mt-0.5 text-primary-green focus:ring-primary-green/50 rounded"
                        aria-label="宴会・パーティーでコース料理を希望"
                      />
                      <div className="ml-3 flex-1">
                        <span className="block text-sm md:text-base font-bold text-gray-900 font-japanese-body">
                          宴会・パーティーでコース料理を希望
                        </span>
                        <p className="text-xs md:text-sm text-gray-600 mt-1 font-japanese-body leading-relaxed">
                          忘年会・新年会・女子会・誕生日会・歓送迎会など、各種宴会に対応いたします。<br />
                          チェックを入れていただくと、後ほどお電話またはメールで詳しい内容をご相談させていただきます。<br />
                          お客様のご要望やご予算に合わせて料理をお作りいたします。
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* アレルギー・食事制限 */}
                  <div>
                    <label 
                      htmlFor="allergies" 
                      className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                    >
                      アレルギー・食事制限（任意）
                    </label>
                    <input
                      type="text"
                      id="allergies"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green transition-all font-japanese-body"
                      placeholder="例: 海老アレルギー、ベジタリアン対応など"
                      aria-label="アレルギー・食事制限"
                    />
                  </div>
                </>
              )}

              {/* Message Field */}
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm md:text-base font-bold text-gray-900 mb-2 font-japanese-body"
                >
                  {formData.formType === 'reservation' ? 'その他のご要望（任意）' : 'お問い合わせ内容'} 
                  {formData.formType === 'inquiry' && <span className="text-primary-orange"> *</span>}
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
                  placeholder={
                    formData.formType === 'reservation'
                      ? '特別なご要望やご不明点などがございましたらご記入ください。'
                      : 'メニューの追加希望、ご質問、改善案な、応援メッセージなど、お気軽にお聞かせください。'
                  }
                  aria-label={formData.formType === 'reservation' ? 'その他のご要望' : 'お問い合わせ内容'}
                  aria-required={formData.formType === 'inquiry'}
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
                  className="p-4 md:p-5 bg-green-50 border-2 border-green-500 rounded-lg"
                >
                  <p className="text-green-800 font-bold text-center font-japanese-body text-base md:text-lg mb-2">
                    {formData.formType === 'reservation' 
                      ? 'ご予約を受け付けました。ご来店をお待ちしております！' 
                      : 'お問い合わせを受け付けました。ありがとうございます！'}
                  </p>
                  <p className="text-green-700 text-center font-japanese-body text-sm md:text-base">
                    登録されたメールアドレス宛てに自動返信メールをお送りしました。<br />
                    内容をご確認ください。
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
