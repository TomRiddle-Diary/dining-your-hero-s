'use client';

import { useState } from 'react';
import { GiBowlOfRice, GiMeat, GiSteak, GiNoodles, GiCookingPot, GiSushis, GiBeerStein, GiPizzaSlice, GiCoffeeCup } from 'react-icons/gi';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import menu images
import beefDon from '@/images/menu/beef_don.webp';
import dryCurry from '@/images/menu/dry_curry.webp';
import katsuryCurry from '@/images/menu/oomori_katus_carry.webp';
import staminaDon from '@/images/menu/sutamina_don.webp';
import turkeyRice from '@/images/menu/turkey_rice.webp';

const categories = [
  { id: 'specialty', name: '名物', Icon: GiBowlOfRice },
  { id: 'steak', name: 'ステーキ', Icon: GiSteak },
  { id: 'donburi-teishoku', name: '丼・定食', Icon: GiMeat },
  { id: 'curry', name: 'カレー', Icon: GiCookingPot },
  { id: 'noodles', name: '麺', Icon: GiNoodles },
  { id: 'pizza', name: 'ピザ', Icon: GiPizzaSlice },
  { id: 'appetizers', name: 'おつまみ', Icon: GiSushis },
  { id: 'cafe', name: 'カフェ', Icon: GiCoffeeCup },
  { id: 'drinks', name: 'ドリンク', Icon: GiBeerStein },
];

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  note?: string;
  image?: any;
}

const specialtyMenu: MenuItem[] = [
  {
    id: 'beef-steak-don',
    name: '山盛りステーキ丼',
    description: '柔らか赤身ステーキをガーリックバター醤油で召し上がりください。',
    price: '1,300円',
    note: '※ご飯300g、牛肉は通常サイズの2倍になります。',
    image: beefDon,
  },
  {
    id: 'chicken-katsu-curry',
    name: '山盛りチキン勝つカレー',
    description: '学生必見！\nとにかくボリューミー勝カレーをお楽しみください。',
    price: '1,000円',
    note: '※ご飯300g、チキンカツ300g、カレーソース200g。学生は900円。',
    image: katsuryCurry,
  },
  {
    id: 'cheese-fondue-dry-curry',
    name: 'チーズフォンデュドライカレー',
    description: 'チーズ好きにはたまらない！\nチーズマグマの海で泳ぎたい!!',
    price: '1,300円',
    note: '※スープ・サラダ付。',
    image: dryCurry,
  },
  {
    id: 'turkey-rice',
    name: 'トルコライス',
    description: '長崎名物トルコライス。\nカレー、ナポリタン、とんかつをワンプレートでお楽しみください。',
    price: '900円',
    note: '※スープ付き。',
    image: turkeyRice,
  },
  {
    id: 'stamina-don',
    name: '豚スタ丼',
    description: 'ニンニクたっぷりスタミナ丼。\nガツンと元気注入!豚肉×ニンニクの極み。',
    price: '800円',
    note: '※サイズ変更可。\nレギュラー800円(ご飯200g、肉150g)\nレディース: 600円(ご飯180g、肉80g)\n大盛り: 950円(ご飯350g、肉200g)\nメガ盛り: 1250円(ご飯500g、肉300g)',
    image: staminaDon,
  },
];

const steakMenu: MenuItem[] = [
  {
    id: 'beef-steak-don-yamari',
    name: '山盛りステーキ丼',
    price: '1,300円',
    note: '※ご飯300g、牛肉は通常サイズの2倍',
  },
  {
    id: 'beef-steak-don',
    name: '牛ステーキ丼',
    price: '950円',
  },
  {
    id: 'beef-steak-chahan',
    name: '牛ステーキチャーハン',
    price: '1,250円',
  },
  {
    id: 'beef-cut-steak-set',
    name: '牛カットステーキset',
    price: '1,800円',
  },
  {
    id: 'pork-loin-steak-set',
    name: '豚ロースステーキset',
    price: '1,200円',
  },
];

const donburiTeishokuMenu: MenuItem[] = [
  {
    id: 'buta-suta-don',
    name: '豚スタ丼',
    price: '800円',
  },
  {
    id: 'turkey-rice',
    name: 'トルコライス',
    price: '900円',
  },
  {
    id: 'turkey-special',
    name: 'トルコスペシャル',
    price: '1,300円',
    note: '※ハンバーグとエビフライ 付',
  },
  {
    id: 'chicken-tomato-cheese',
    name: 'チキンのトマトチーズ焼き',
    price: '850円',
  },
  {
    id: 'atugiri-rosu-katsu',
    name: '厚切りロースかつ定食',
    price: '1,300円',
    note: '※牛乳料理がつのだけ ご飯までのおかずで',
  },
  {
    id: 'rosu-katsu-teishoku',
    name: 'ロース勝つ丼定食',
    price: '850円',
    note: '※牛乳料理がつのだけ ご飯までのおかずで',
  },
  {
    id: 'garibata-chicken-don',
    name: 'ガリバタチキン丼',
    price: '850円',
  },
  {
    id: 'teppan-buta-kimchi',
    name: '鉄板豚キムチ定食',
    price: '950円',
  },
  {
    id: 'taco-rice-plate',
    name: '沖縄名物タコライスプレート',
    price: '1,300円',
  },
  {
    id: 'loco-moco-plate',
    name: 'ハワイ名物ロコモコプレート',
    price: '850円',
  },
  {
    id: 'omurice-plate',
    name: 'オムライスプレート',
    price: '900円',
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FFF3D4] py-16 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-[#0D4D4D] mb-4 tracking-wider">
          FIND YOUR FAVORITE
        </h1>
        <p className="text-xl md:text-3xl font-black text-[#FF6B1A] font-japanese">
          あなたの「一番」がきっと見つかる
        </p>
      </div>

      {/* Category Navigation */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-white rounded-[50px] shadow-lg p-4 md:p-6 overflow-x-auto scrollbar-thin">
          <div className="flex gap-8 md:gap-10 min-w-max px-2">
            {categories.map((category) => {
              const { Icon } = category;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-3xl transition-all hover:bg-[#F5EBD7] min-w-[90px] ${
                    selectedCategory === category.id ? 'bg-[#F5EBD7]' : ''
                  }`}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10 mb-2 text-[#0D4D4D]" />
                  <span className="text-sm md:text-base font-bold text-[#0D4D4D] font-japanese whitespace-nowrap">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Items Section */}
      {selectedCategory ? (
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#FFF7E3] rounded-3xl shadow-lg p-6 md:p-10">
            {/* Category Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-[#0D4D4D] mb-2 font-japanese">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <hr className="mt-6 border-t-2 border-[#0D4D4D]/10" />
            </div>

            {/* Menu Items List */}
            {selectedCategory === 'specialty' ? (
              <div className="space-y-8">
                {specialtyMenu.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                      {/* Image */}
                      <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-white shadow-lg p-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={192}
                            height={192}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left max-w-2xl mx-auto">
                        <h3 className="text-xl md:text-2xl font-black text-[#DC281C] mb-2 font-japanese">
                          {item.name}
                        </h3>
                        <p className="text-sm md:text-base text-black font-bold mb-2 whitespace-pre-line font-japanese">
                          {item.description}
                        </p>
                        {item.note && (
                          <p className="text-xs md:text-sm text-gray-600 font-japanese whitespace-pre-line">
                            {item.note}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 mx-auto md:mx-0 md:ml-4">
                        <p className="text-2xl md:text-3xl font-black text-black">
                          {item.price}
                        </p>
                      </div>
                    </div>
                    {index < specialtyMenu.length - 1 && (
                      <hr className="mt-8 border-t-2 border-[#0D4D4D]/10" />
                    )}
                  </div>
                ))}
              </div>
            ) : selectedCategory === 'steak' ? (
              <div className="space-y-8 max-w-3xl mx-auto">
                {steakMenu.map((item, index) => (
                  <div key={item.id}>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-black mb-2 font-japanese">
                        {item.name}
                      </h3>
                      <hr className="border-t-2 border-black mb-2" />
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {item.note && (
                            <p className="text-xs md:text-sm text-gray-600 font-japanese">
                              {item.note}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <p className="text-xl md:text-2xl font-black text-black">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedCategory === 'donburi-teishoku' ? (
              <div className="space-y-8 max-w-3xl mx-auto">
                {donburiTeishokuMenu.map((item, index) => (
                  <div key={item.id}>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-black mb-2 font-japanese">
                        {item.name}
                      </h3>
                      <hr className="border-t-2 border-black mb-2" />
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {item.note && (
                            <p className="text-xs md:text-sm text-gray-600 font-japanese">
                              {item.note}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <p className="text-xl md:text-2xl font-black text-black">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl md:text-2xl font-bold text-[#FF6B1A] font-japanese">
                  メニュー項目は近日公開予定です
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-bold text-[#0D4D4D] font-japanese">
            カテゴリーを選択してメニューを表示
          </p>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
}
