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

interface DrinkItem {
  id: string;
  name: string;
  price?: string;
  sizes?: {
    large?: string;
    medium?: string;
    small?: string;
  };
}

interface DrinkCategory {
  id: string;
  category: string;
  drinks: DrinkItem[];
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
    description: '学生必見！\nとにかくボリューミーな勝カレーをお楽しみください。',
    price: '1,000円',
    note: '※ご飯300g、チキンカツ300g、カレーソース200g。学生は900円。',
    image: katsuryCurry,
  },
  {
    id: 'cheese-fondue-dry-curry',
    name: 'チーズフォンデュドライカレー',
    description: 'チーズ好きにはたまらない！\nチーズマグマの海で泳ぎたい!!',
    price: '900円',
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
    note: '※サイズ変更可。',
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
    price: '950円',
  },
  {
    id: 'turkey-special',
    name: 'トルコスペシャル',
    price: '1,300円',
    note: '※ハンバーグとエビフライ付',
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
    note: '※学生証提示で50円引き or ご飯大盛りサービス',
  },
  {
    id: 'rosu-katsu-teishoku',
    name: 'ロース勝つ丼定食',
    price: '850円',
    note: '※学生証提示で50円引き or ご飯大盛りサービス',
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
    price: '850円',
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

const curryMenu: MenuItem[] = [
  {
    id: 'yamari-chicken-katsu-curry',
    name: '山盛りチキン勝つカレー',
    price: '1,000円',
  },
  {
    id: 'cheese-fondue-dry-curry',
    name: 'チーズフォンデュドライカレー',
    price: '950円',
  },
  {
    id: 'rosu-katsu-curry',
    name: 'ロース勝つカレー',
    price: '850円',
    note: '※学生証提示で50円引き or ご飯大盛りサービス',
  },
  {
    id: 'keema-curry',
    name: 'キーマカレー',
    price: '850円',
  },
  {
    id: 'yaki-curry',
    name: '焼きカレー',
    price: '850円',
  },
  {
    id: 'hamburg-doria',
    name: 'ハンバーグドリア',
    price: '900円',
  },
  {
    id: 'chicken-doria',
    name: 'チキンドリア',
    price: '850円',
  },
  {
    id: 'meat-sauce-doria',
    name: 'ミートソースドリア',
    price: '850円',
  },
];

const noodlesMenu: MenuItem[] = [
  {
    id: 'ebi-bacon-cream',
    name: '海老とベーコンのクリーム',
    price: '950円',
  },
  {
    id: 'asari-peperoncino',
    name: 'アサリごろごろペペロンチーノ',
    price: '900円',
  },
  {
    id: 'teppan-napolitan-tamago',
    name: '鉄板ナポリタンと玉子とじ',
    price: '850円',
  },
  {
    id: 'seafood-pescatore',
    name: '海鮮ペスカトーレ',
    price: '1,000円',
  },
  {
    id: 'bolognese',
    name: 'ボロネーゼ',
    price: '800円',
  },
  {
    id: 'napori-chan',
    name: 'ナポリちゃん',
    price: '850円',
    note: '※ちゃんぽん麺を使ったナポリタン',
  },
  {
    id: 'taco-meat-pasta',
    name: 'タコミートパスタ',
    price: '900円',
  },
  {
    id: 'yoshokuya-champon',
    name: '洋食屋のちゃんぽん',
    price: '850円',
  },
];

const pizzaMenu: MenuItem[] = [
  {
    id: 'sasebo-jumbo-garlic',
    name: '佐世保ジャンボニンニク',
    price: '700円',
  },
  {
    id: 'kinoko-bacon',
    name: 'きのこベーコン',
    price: '700円',
  },
  {
    id: 'potato-salad',
    name: 'ポテトサラダ',
    price: '700円',
  },
  {
    id: 'sweet-corn-bacon',
    name: 'スイートコーンとベーコン',
    price: '700円',
  },
  {
    id: 'nama-ham-tomato',
    name: '生ハムトマト',
    price: '750円',
  },
  {
    id: 'teriyaki-chicken',
    name: '照り焼きチキン',
    price: '750円',
  },
  {
    id: 'german-potato',
    name: 'ジャーマンポテト',
    price: '750円',
  },
];

const appetizersMenu: MenuItem[] = [
  {
    id: 'kibinago-tempura',
    name: 'キビナゴの天ぷら',
    price: '500円',
  },
  {
    id: 'asari-butter',
    name: 'アサリバター',
    price: '500円',
  },
  {
    id: 'tebasaki-karaage',
    name: 'やみつき手羽先唐揚げ',
    price: '600円',
  },
  {
    id: 'ika-karaage',
    name: 'いかの唐揚げ',
    price: '500円',
  },
  {
    id: 'yaki-ramen',
    name: '焼きラーメン',
    price: '700円',
  },
  {
    id: 'otona-ebisen',
    name: '大人の海老せん',
    price: '500円',
  },
  {
    id: 'garlic-edamame',
    name: 'ガーリック枝豆',
    price: '500円',
  },
  {
    id: 'omakase-salad',
    name: 'おまかせサラダ',
    price: '700円',
  },
  {
    id: 'jumbo-garlic-kinoko-ahijo',
    name: 'ジャンボニンニクときのこのアヒージョ',
    price: '700円',
  },
  {
    id: 'sunazuri-ahijo',
    name: '砂ズリのアヒージョ',
    price: '700円',
  },
  {
    id: 'ebi-ahijo',
    name: '海老のアヒージョ',
    price: '800円',
  },
  {
    id: 'shoestring-potato',
    name: 'シューストリングポテトフライ',
    price: '600円',
  },
  {
    id: 'genki-ebi-mayo',
    name: '元気な海老マヨ',
    price: '750円',
  },
  {
    id: 'tako-carpaccio',
    name: 'たこのカルパッチョ',
    price: '750円',
  },
  {
    id: 'hotate-carpaccio',
    name: '帆立貝柱のカルパッチョ',
    price: '800円',
    note: '※ハーフ450円',
  },
  {
    id: 'dashimaki-tamago',
    name: '手作りだし巻き玉子',
    price: '650円',
    note: '※+100円でチーズトッピング',
  },
  {
    id: 'karaage-yourinchi',
    name: '若鶏の唐揚げユーリンチーソース',
    price: '700円',
    note: '※ハーフ400円',
  },
  {
    id: 'chicken-steak-garibata',
    name: '若鶏のステーキガリバタソース',
    price: '750円',
  },
  {
    id: 'beef-kakugiri-garibata',
    name: '牛肉の角切りステーキガリバタソース',
    price: '800円',
  },
  {
    id: 'beef-tataki-ponzu',
    name: '牛肉のタタキポン酢ソース',
    price: '800円',
  },
  {
    id: 'miyazaki-chicken-nanban',
    name: '宮崎名物チキン南蛮',
    price: '700円',
    note: '※ハーフ400円',
  },
  {
    id: 'kamo-smoke',
    name: 'カモのスモーク',
    price: '600円',
  },
];

const cafeMenu: MenuItem[] = [
  {
    id: 'fruits-parfait',
    name: 'フルーツパフェ',
    price: '600円',
    note: '※フルーツは季節により変わります',
  },
  {
    id: 'soda-float',
    name: 'ソーダフロート',
    price: '450円',
  },
  {
    id: 'coffee-float',
    name: 'コーヒーフロート',
    price: '450円',
  },
  {
    id: 'wiener-coffee',
    name: 'ウインナーコーヒー',
    price: '450円',
  },
  {
    id: 'nouko-cocoa',
    name: '濃厚ココア',
    price: '550円',
  },
  {
    id: 'ice-cocoa',
    name: 'アイスココア',
    price: '550円',
  },
];

const drinksMenu: DrinkCategory[] = [
  {
    id: 'beer',
    category: '▪ビール',
    drinks: [
      {
        id: 'draft-beer',
        name: '生ビール（アサヒ）',
        sizes: { large: '650円', medium: '500円', small: '350円' },
      },
    ],
  },
  {
    id: 'highball',
    category: '▪ハイボール',
    drinks: [
      { id: 'black-nikka-clear', name: 'ブラックニッカクリア', price: '400円' },
      { id: 'ginger-highball', name: 'ジンジャーハイ', price: '400円' },
      { id: 'black', name: 'ブラック', price: '400円' },
    ],
  },
  {
    id: 'sour',
    category: '▪サワー',
    drinks: [
      { id: 'lemon', name: 'レモン', price: '400円' },
      { id: 'lime', name: 'ライム', price: '400円' },
      { id: 'calpis', name: 'カルピス', price: '400円' },
      { id: 'apple', name: '青りんご', price: '400円' },
      { id: 'shikuwasa', name: 'シークヮーサー', price: '400円' },
      { id: 'grapefruit', name: 'グレープフルーツ', price: '400円' },
      { id: 'peach', name: '桃', price: '400円' },
      { id: 'grape', name: '巨峰', price: '400円' },
    ],
  },
  {
    id: 'cocktail',
    category: '▪カクテル',
    drinks: [
      { id: 'cassis-soda', name: 'カシスソーダ', price: '450円' },
      { id: 'cassis-orange', name: 'カシスオレンジ', price: '450円' },
      { id: 'fuzzy-navel', name: 'ファジーネーブル', price: '450円' },
      { id: 'gin-tonic', name: 'ジントニック', price: '450円' },
      { id: 'moscow-mule', name: 'モスコミュール', price: '450円' },
    ],
  },
  {
    id: 'wine',
    category: '▪ワイン',
    drinks: [
      { id: 'wine-glass', name: 'グラス', price: '350円' },
      { id: 'wine-carafe', name: 'カラフェ', price: '1,000円' },
    ],
  },
  {
    id: 'shochu',
    category: '▪焼酎',
    drinks: [
      { id: 'shochu-glass', name: 'グラス', price: '450円' },
      { id: 'shochu-bottle', name: '飲みきりボトル', price: '2,400円' },
    ],
  },
  {
    id: 'umeshu',
    category: '▪梅酒',
    drinks: [
      { id: 'umeshu-rock', name: 'ロック', price: '400円' },
      { id: 'umeshu-soda', name: 'ソーダ', price: '400円' },
    ],
  },
  {
    id: 'others',
    category: '▪その他',
    drinks: [
      { id: 'gin', name: 'ジン', price: '500円' },
      { id: 'vodka', name: 'ウォッカ', price: '500円' },
      { id: 'tequila', name: 'テキーラ', price: '500円' },
    ],
  },
  {
    id: 'soft-drink',
    category: '▪ソフトドリンク',
    drinks: [
      { id: 'coca-cola', name: 'コカコーラ', price: '250円' },
      { id: 'oolong-tea', name: 'ウーロン茶', price: '250円' },
      { id: 'ginger-ale', name: 'ジンジャーエール', price: '250円' },
      { id: 'calpis-drink', name: 'カルピス', price: '250円' },
      { id: 'calpis-soda', name: 'カルピスソーダ', price: '250円' },
      { id: 'coffee', name: 'コーヒー', price: '250円' },
      { id: 'tea', name: '紅茶', price: '250円' },
    ],
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('specialty');

  return (
    <>
      <Header isFixed={false} />
      <div className="min-h-screen bg-[#FFF3D4] pb-6 md:pb-12 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-8 pt-6 md:pt-12">
        <h1 className="text-4xl md:text-5xl font-black text-[#0D4D4D] mb-4 tracking-wider">
          FIND <br />YOUR FAVORITE
        </h1>
        <p className="text-xl md:text-3xl font-black text-[#FF6B1A] font-japanese">
          あなたの一番がきっと見つかる
        </p>
      </div>

      {/* Category Navigation - Fixed */}
      <div className="sticky top-0 z-30 bg-[#FFF3D4] pb-4 pt-2">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[60px] shadow-md p-1 md:p-4">
            <div className="overflow-x-auto category-scroll">
              <div className="flex gap-6 md:gap-12 min-w-max px-2">
              {categories.map((category) => {
                const { Icon } = category;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-3xl transition-all hover:scale-105 min-w-[90px] ${
                      isSelected ? '' : 'opacity-40'
                    }`}
                  >
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 mb-2 transition-colors ${
                      isSelected ? 'text-primary-green' : 'text-[#0D4D4D]'
                    }`} />
                    <span className={`text-sm md:text-base font-bold font-japanese whitespace-nowrap transition-colors ${
                      isSelected ? 'text-primary-green' : 'text-[#0D4D4D]'
                    }`}>
                      {category.name}
                    </span>
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items Section */}
      {selectedCategory ? (
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#FFF7E3] rounded-3xl shadow-md p-6 md:p-10">
            {/* Category Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-[#0D4D4D] mb-2 font-japanese">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-base md:text-lg text-[#FF6B1A] font-bold font-japanese mt-2">
                {selectedCategory === 'specialty' && '当店自慢の看板メニュー'}
                {selectedCategory === 'steak' && '豪快にジューシーに、肉の旨みを堪能'}
                {selectedCategory === 'donburi-teishoku' && 'ボリューム満点！満腹間違いなし'}
                {selectedCategory === 'curry' && 'こだわりのカレー＆ドリア'}
                {selectedCategory === 'noodles' && 'もちもち麺が絡む至福のパスタ'}
                {selectedCategory === 'pizza' && 'カリッと香ばしく、焼きたてアツアツ'}
                {selectedCategory === 'appetizers' && 'お酒のお供に最高の一品'}
                {selectedCategory === 'cafe' && 'ほっと一息、甘いひととき'}
                {selectedCategory === 'drinks' && '乾杯から締めまで、豊富な品揃え'}
              </p>
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
                        <div className="w-56 h-56 md:w-48 md:h-48 rounded-full overflow-hidden bg-white shadow-lg p-2 transition-transform hover:scale-110 duration-300">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={224}
                            height={224}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left max-w-2xl mx-auto">
                        <h3 className="text-xl md:text-2xl font-black text-[#DC281C] mb-4 font-japanese">
                          {item.name}
                        </h3>
                        <p className="text-sm text-left md:text-base text-black font-bold whitespace-pre-line font-japanese">
                          {item.description}
                        </p>
                        {item.note && (
                          <p className="text-[14px] text-left md:text-sm text-gray-600 font-japanese whitespace-pre-line">
                            {item.note}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 mx-auto md:mx-0 md:ml-4">
                        <p className="text-xl md:text-2xl font-bold text-black">
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
                      <h3 className="text-lg md:text-xl font-bold text-black mb-2 font-japanese">
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
                          <p className="text-lg md:text-2xl font-bold text-black">
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
                      <h3 className="text-lg md:text-xl font-bold text-black mb-2 font-japanese">
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
                          <p className="text-lg md:text-2xl font-bold text-black">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedCategory === 'curry' ? (
              <div className="space-y-8 max-w-3xl mx-auto">
                {curryMenu.map((item, index) => (
                  <div key={item.id}>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-black mb-2 font-japanese">
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
                          <p className="text-lg md:text-2xl font-bold text-black">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedCategory === 'noodles' ? (
              <div className="space-y-8 max-w-3xl mx-auto">
                {noodlesMenu.map((item, index) => (
                  <div key={item.id}>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-black mb-2 font-japanese">
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
                          <p className="text-lg md:text-2xl font-bold text-black">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedCategory === 'pizza' ? (
              <div className="space-y-8 max-w-3xl mx-auto">
                {pizzaMenu.map((item, index) => (
                  <div key={item.id}>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-black mb-2 font-japanese">
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
                          <p className="text-lg md:text-2xl font-bold text-black">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedCategory === 'appetizers' ? (
              <div className="space-y-8 max-w-3xl mx-auto">
                {appetizersMenu.map((item, index) => (
                  <div key={item.id}>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-black mb-2 font-japanese">
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
                          <p className="text-lg md:text-2xl font-bold text-black">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedCategory === 'cafe' ? (
              <div className="space-y-8 max-w-3xl mx-auto">
                {cafeMenu.map((item, index) => (
                  <div key={item.id}>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-black mb-2 font-japanese">
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
                          <p className="text-lg md:text-2xl font-bold text-black">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedCategory === 'drinks' ? (
              <div className="space-y-10 max-w-3xl mx-auto">
                {drinksMenu.map((category, categoryIndex) => (
                  <div key={category.id}>
                    {/* Category Title */}
                    <h3 className="text-xl md:text-2xl font-black text-black mb-6 font-japanese">
                      {category.category}
                    </h3>
                    
                    {/* Drinks in Category */}
                    <div className="space-y-8 pl-4">
                      {category.drinks.map((drink) => (
                        <div key={drink.id}>
                          <div>
                            <h4 className="text-base md:text-lg font-bold text-black mb-2 font-japanese">
                              {drink.name}
                            </h4>
                            <hr className="border-t-2 border-black mb-2" />
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1"></div>
                              <div className="flex-shrink-0">
                                {drink.sizes ? (
                                  <div className="text-right space-y-1">
                                    {drink.sizes.large && (
                                      <p className="text-base md:text-lg font-bold text-black">
                                        (大) {drink.sizes.large}
                                      </p>
                                    )}
                                    {drink.sizes.medium && (
                                      <p className="text-base md:text-lg font-bold text-black">
                                        (中) {drink.sizes.medium}
                                      </p>
                                    )}
                                    {drink.sizes.small && (
                                      <p className="text-base md:text-lg font-bold text-black">
                                        (小) {drink.sizes.small}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-lg md:text-2xl font-bold text-black">
                                    {drink.price}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
