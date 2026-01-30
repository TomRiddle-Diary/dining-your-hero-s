'use client';

import { useState, useRef, useEffect } from 'react';
import { GiBowlOfRice, GiMeal, GiSteak, GiNoodles, GiSpoon, GiShrimp, GiBeerStein, GiPizzaSlice, GiCoffeeCup } from 'react-icons/gi';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Note: Metadata must be exported from a Server Component
// Since this is 'use client', we'll add metadata via layout or separate metadata export

// Import menu images
import beefDon from '@/images/menu/beef_don.webp';
import dryCurry from '@/images/menu/dry_curry.webp';
import katsuryCurry from '@/images/menu/oomori_katus_carry.webp';
import staminaDon from '@/images/menu/sutamina_don.webp';
import turkeyRice from '@/images/menu/turkey_rice.webp';

const categories = [
  { id: 'specialty', name: '名物', Icon: GiBowlOfRice },
  { id: 'drinks', name: 'ドリンク', Icon: GiBeerStein },
  { id: 'steak', name: 'ステーキ', Icon: GiSteak },
  { id: 'donburi-teishoku', name: '丼・定食', Icon: GiMeal },
  { id: 'curry', name: 'カレー', Icon: GiSpoon },
  { id: 'noodles', name: '麺', Icon: GiNoodles },
  { id: 'pizza', name: 'ピザ', Icon: GiPizzaSlice },
  { id: 'appetizers', name: 'おつまみ', Icon: GiShrimp },
  { id: 'cafe', name: 'カフェ', Icon: GiCoffeeCup },
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
    price: '¥1,300',
    note: '※ご飯300g、牛肉は通常サイズの2倍になります。',
    image: beefDon,
  },
  {
    id: 'chicken-katsu-curry',
    name: '山盛りチキン勝つカレー',
    description: '学生必見！\nとにかくボリューミーな勝カレーをお楽しみください。',
    price: '¥1,000',
    note: '※ご飯300g、チキンカツ300g、カレーソース200g。学生は¥900。',
    image: katsuryCurry,
  },
  {
    id: 'cheese-fondue-dry-curry',
    name: 'チーズフォンデュドライカレー',
    description: 'チーズ好きにはたまらない！\nチーズマグマの海で泳ぎたい!!',
    price: '¥950',
    note: '※スープ・サラダ付。',
    image: dryCurry,
  },
  {
    id: 'turkey-rice',
    name: 'トルコライス',
    description: '長崎名物トルコライス。\nカレー、ナポリタン、とんかつをワンプレートでお楽しみください。',
    price: '¥900',
    note: '※スープ付き。',
    image: turkeyRice,
  },
  {
    id: 'stamina-don',
    name: '豚スタ丼',
    description: 'ニンニクたっぷりスタミナ丼。\nガツンと元気注入!豚肉×ニンニクの極み。',
    price: '¥800',
    note: '※サイズ変更可。',
    image: staminaDon,
  },
];

const steakMenu: MenuItem[] = [
  {
    id: 'beef-steak-don-yamari',
    name: '山盛りステーキ丼',
    price: '¥1,300',
    note: '※ご飯300g、牛肉は通常サイズの2倍',
  },
  {
    id: 'beef-steak-don',
    name: '牛ステーキ丼',
    price: '¥950',
  },
  {
    id: 'beef-steak-chahan',
    name: '牛ステーキチャーハン',
    price: '¥1,250',
  },
  {
    id: 'beef-cut-steak-set',
    name: '牛カットステーキset',
    price: '¥1,800',
  },
  {
    id: 'pork-loin-steak-set',
    name: '豚ロースステーキset',
    price: '¥1,200',
  },
];

const donburiTeishokuMenu: MenuItem[] = [
  {
    id: 'buta-suta-don',
    name: '豚スタ丼',
    price: '¥800',
  },
  {
    id: 'turkey-rice',
    name: 'トルコライス',
    price: '¥900',
  },
  {
    id: 'turkey-special',
    name: 'トルコスペシャル',
    price: '¥1,300',
    note: '※ハンバーグとエビフライ付',
  },
  {
    id: 'chicken-tomato-cheese',
    name: 'チキンのトマトチーズ焼き',
    price: '¥850',
  },
  {
    id: 'atugiri-rosu-katsu',
    name: '厚切りロースかつ定食',
    price: '¥900',
    note: '※学生証提示で¥50引き or ご飯大盛りサービス',
  },
  {
    id: 'rosu-katsu-teishoku',
    name: 'ロース勝つ丼定食',
    price: '¥850',
    note: '※学生証提示で¥50引き or ご飯大盛りサービス',
  },
  {
    id: 'garibata-chicken-don',
    name: 'ガリバタチキン丼',
    price: '¥850',
  },
  {
    id: 'teppan-buta-kimchi',
    name: '鉄板豚キムチ定食',
    price: '¥950',
  },
  {
    id: 'taco-rice-plate',
    name: '沖縄名物タコライスプレート',
    price: '¥900',
  },
  {
    id: 'loco-moco-plate',
    name: 'ハワイ名物ロコモコプレート',
    price: '¥900',
  },
  {
    id: 'omurice-plate',
    name: 'オムライスプレート',
    price: '¥950',
  },
];

const curryMenu: MenuItem[] = [
  {
    id: 'yamari-chicken-katsu-curry',
    name: '山盛りチキン勝つカレー',
    price: '¥1,000',
  },
  {
    id: 'cheese-fondue-dry-curry',
    name: 'チーズフォンデュドライカレー',
    price: '¥950',
  },
  {
    id: 'rosu-katsu-curry',
    name: 'ロース勝つカレー',
    price: '¥850',
    note: '※学生証提示で¥50引き or ご飯大盛りサービス',
  },
  {
    id: 'keema-curry',
    name: 'キーマカレー',
    price: '¥900',
  },
  {
    id: 'yaki-curry',
    name: '焼きカレー',
    price: '¥900',
  },
  {
    id: 'hamburg-doria',
    name: 'ハンバーグドリア',
    price: '¥900',
  },
  {
    id: 'chicken-doria',
    name: 'チキンドリア',
    price: '¥850',
  },
  {
    id: 'meat-sauce-doria',
    name: 'ミートソースドリア',
    price: '¥850',
  },
];

const noodlesMenu: MenuItem[] = [
  {
    id: 'ebi-bacon-cream',
    name: '海老とベーコンのクリーム',
    price: '¥950',
  },
  {
    id: 'asari-peperoncino',
    name: 'アサリごろごろペペロンチーノ',
    price: '¥900',
  },
  {
    id: 'teppan-napolitan-tamago',
    name: '鉄板ナポリタンと玉子とじ',
    price: '¥900',
  },
  {
    id: 'seafood-pescatore',
    name: '海鮮ペスカトーレ',
    price: '¥1,000',
  },
  {
    id: 'bolognese',
    name: 'ボロネーゼ',
    price: '¥800',
  },
  {
    id: 'napori-chan',
    name: 'ナポリちゃん',
    price: '¥900',
    note: '※ちゃんぽん麺を使ったナポリタン',
  },
  {
    id: 'taco-meat-pasta',
    name: 'タコミートパスタ',
    price: '¥950',
  },
  {
    id: 'yoshokuya-champon',
    name: '洋食屋のちゃんぽん',
    price: '¥850',
  },
];

const pizzaMenu: MenuItem[] = [
  {
    id: 'sasebo-jumbo-garlic',
    name: '佐世保ジャンボニンニク',
    price: '¥700',
  },
  {
    id: 'kinoko-bacon',
    name: 'きのこベーコン',
    price: '¥700',
  },
  {
    id: 'potato-salad',
    name: 'ポテトサラダ',
    price: '¥700',
  },
  {
    id: 'sweet-corn-bacon',
    name: 'スイートコーンとベーコン',
    price: '¥700',
  },
  {
    id: 'nama-ham-tomato',
    name: '生ハムトマト',
    price: '¥750',
  },
  {
    id: 'teriyaki-chicken',
    name: '照り焼きチキン',
    price: '¥750',
  },
  {
    id: 'german-potato',
    name: 'ジャーマンポテト',
    price: '¥750',
  },
];

const appetizersMenu: MenuItem[] = [
  {
    id: 'kibinago-tempura',
    name: 'キビナゴの天ぷら',
    price: '¥500',
  },
  {
    id: 'asari-butter',
    name: 'アサリバター',
    price: '¥500',
  },
  {
    id: 'tebasaki-karaage',
    name: 'やみつき手羽先唐揚げ',
    price: '¥600',
  },
  {
    id: 'ika-karaage',
    name: 'いかの唐揚げ',
    price: '¥500',
  },
  {
    id: 'yaki-ramen',
    name: '焼きラーメン',
    price: '¥700',
  },
  {
    id: 'otona-ebisen',
    name: '大人の海老せん',
    price: '¥500',
  },
  {
    id: 'garlic-edamame',
    name: 'ガーリック枝豆',
    price: '¥500',
  },
  {
    id: 'omakase-salad',
    name: 'おまかせサラダ',
    price: '¥700',
  },
  {
    id: 'jumbo-garlic-kinoko-ahijo',
    name: 'ジャンボニンニクときのこのアヒージョ',
    price: '¥700',
  },
  {
    id: 'sunazuri-ahijo',
    name: '砂ズリのアヒージョ',
    price: '¥700',
  },
  {
    id: 'ebi-ahijo',
    name: '海老のアヒージョ',
    price: '¥800',
  },
  {
    id: 'shoestring-potato',
    name: 'シューストリングポテトフライ',
    price: '¥600',
  },
  {
    id: 'genki-ebi-mayo',
    name: '元気な海老マヨ',
    price: '¥750',
  },
  {
    id: 'tako-carpaccio',
    name: 'たこのカルパッチョ',
    price: '¥750',
  },
  {
    id: 'hotate-carpaccio',
    name: '帆立貝柱のカルパッチョ',
    price: '¥800',
    note: '※ハーフ¥450',
  },
  {
    id: 'dashimaki-tamago',
    name: '手作りだし巻き玉子',
    price: '¥650',
    note: '※+¥100でチーズトッピング',
  },
  {
    id: 'karaage-yourinchi',
    name: '若鶏の唐揚げユーリンチーソース',
    price: '¥700',
    note: '※ハーフ¥400',
  },
  {
    id: 'chicken-steak-garibata',
    name: '若鶏のステーキガリバタソース',
    price: '¥750',
  },
  {
    id: 'beef-kakugiri-garibata',
    name: '牛肉の角切りステーキガリバタソース',
    price: '¥800',
  },
  {
    id: 'beef-tataki-ponzu',
    name: '牛肉のタタキポン酢ソース',
    price: '¥800',
  },
  {
    id: 'miyazaki-chicken-nanban',
    name: '宮崎名物チキン南蛮',
    price: '¥700',
    note: '※ハーフ¥400',
  },
  {
    id: 'kamo-smoke',
    name: 'カモのスモーク',
    price: '¥600',
  },
];

const cafeMenu: MenuItem[] = [
  {
    id: 'fruits-parfait',
    name: 'フルーツパフェ',
    price: '¥600',
    note: '※フルーツは季節により変わります',
  },
  {
    id: 'soda-float',
    name: 'ソーダフロート',
    price: '¥450',
  },
  {
    id: 'coffee-float',
    name: 'コーヒーフロート',
    price: '¥450',
  },
  {
    id: 'wiener-coffee',
    name: 'ウインナーコーヒー',
    price: '¥450',
  },
  {
    id: 'nouko-cocoa',
    name: '濃厚ココア',
    price: '¥550',
  },
  {
    id: 'ice-cocoa',
    name: 'アイスココア',
    price: '¥550',
  },
];

const drinksMenu: DrinkCategory[] = [
  {
    id: 'nomihoudai',
    category: '🍻 飲み放題プラン',
    drinks: [
      {
        id: 'nomihoudai-plan',
        name: '飲み放題（90分）',
        price: '¥2,100',
      },
    ],
  },
  {
    id: 'beer',
    category: '▪ビール',
    drinks: [
      {
        id: 'draft-beer',
        name: '生ビール（アサヒ）',
        sizes: { large: '¥700', medium: '¥550', small: '¥400' },
      },
    ],
  },
  {
    id: 'non-alcoholic-beer',
    category: '▪ノンアルコールビール',
    drinks: [
      { id: 'asahi-dry-zero', name: 'アサヒドライゼロ', price: '¥400' },
    ],
  },
  {
    id: 'highball',
    category: '▪ハイボール',
    drinks: [
      { id: 'black-nikka-clear', name: 'ブラックニッカクリア', price: '¥450' },
      { id: 'ginger-highball', name: 'ジンジャーハイ', price: '¥450' },
      { id: 'black', name: 'ブラック', price: '¥450' },
    ],
  },
  {
    id: 'sour',
    category: '▪サワー',
    drinks: [
      { id: 'lemon', name: 'レモン', price: '¥450' },
      { id: 'lime', name: 'ライム', price: '¥450' },
      { id: 'calpis', name: 'カルピス', price: '¥450' },
      { id: 'apple', name: '青りんご', price: '¥450' },
      { id: 'shikuwasa', name: 'シークヮーサー', price: '¥450' },
      { id: 'grapefruit', name: 'グレープフルーツ', price: '¥450' },
      { id: 'peach', name: '桃', price: '¥450' },
      { id: 'grape', name: '巨峰', price: '¥450' },
    ],
  },
  {
    id: 'cocktail',
    category: '▪カクテル',
    drinks: [
      { id: 'cassis-soda', name: 'カシスソーダ', price: '¥500' },
      { id: 'cassis-orange', name: 'カシスオレンジ', price: '¥500' },
      { id: 'fuzzy-navel', name: 'ファジーネーブル', price: '¥500' },
      { id: 'gin-tonic', name: 'ジントニック', price: '¥500' },
      { id: 'moscow-mule', name: 'モスコミュール', price: '¥500' },
    ],
  },
  {
    id: 'wine',
    category: '▪ワイン',
    drinks: [
      { id: 'wine-glass', name: 'グラス', price: '¥400' },
      { id: 'wine-carafe', name: 'カラフェ', price: '¥1,200' },
    ],
  },
  {
    id: 'shochu',
    category: '▪焼酎',
    drinks: [
      { id: 'shochu-glass', name: 'グラス', price: '¥500' },
      { id: 'shochu-bottle', name: '飲みきりボトル', price: '¥2,600' },
      { id: 'shochu-iki', name: '壱岐', price: '¥3,000' },
    ],
  },
  {
    id: 'sake',
    category: '▪日本酒',
    drinks: [
      { id: 'sake-ichigo', name: '1合', price: '¥500' },
    ],
  },
  {
    id: 'umeshu',
    category: '▪梅酒',
    drinks: [
      { id: 'umeshu-rock', name: 'ロック', price: '¥450' },
      { id: 'umeshu-soda', name: 'ソーダ', price: '¥450' },
    ],
  },
  {
    id: 'others',
    category: '▪その他',
    drinks: [
      { id: 'gin', name: 'ジン', price: '¥500' },
      { id: 'vodka', name: 'ウォッカ', price: '¥500' },
      { id: 'tequila', name: 'テキーラ', price: '¥500' },
    ],
  },
  {
    id: 'soft-drink',
    category: '▪ソフトドリンク',
    drinks: [
      { id: 'coca-cola', name: 'コカコーラ', price: '¥300' },
      { id: 'oolong-tea', name: 'ウーロン茶', price: '¥300' },
      { id: 'ginger-ale', name: 'ジンジャーエール', price: '¥300' },
      { id: 'calpis-drink', name: 'カルピス', price: '¥300' },
      { id: 'calpis-soda', name: 'カルピスソーダ', price: '¥300' },
      { id: 'coffee', name: 'コーヒー', price: '¥300' },
      { id: 'tea', name: '紅茶', price: '¥300' },
    ],
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('specialty');
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 初回マウント時はスクロールをスキップ
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (selectedCategory && categoryRefs.current[selectedCategory] && scrollContainerRef.current) {
      const button = categoryRefs.current[selectedCategory];
      const container = scrollContainerRef.current;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.offsetWidth;
      
      // ボタンを中央に配置するようにスクロール
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }

    // カテゴリ変更時にメニューセクションの一番上にスクロール
    if (menuSectionRef.current) {
      const menuTop = menuSectionRef.current.offsetTop;
      // デスクトップとモバイルで異なるオフセットを適用
      const offset = window.innerWidth >= 768 ? 160 : 120;
      window.scrollTo({
        top: menuTop - offset,
        behavior: 'smooth'
      });
    }
  }, [selectedCategory]);

  return (
    <>
      <Header isFixed={false} />
      <div className="min-h-screen bg-[#FFF3D4] pb-6 md:pb-12 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-4 pt-6 md:pt-12">
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
          <div className="bg-white rounded-[100px] border border-[#0B4943] p-1 md:p-4">
            <div ref={scrollContainerRef} className="overflow-x-auto category-scroll">
              <div className="flex gap-3 md:gap-12 min-w-max px-2">
              {categories.map((category) => {
                const { Icon } = category;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    ref={(el) => { categoryRefs.current[category.id] = el; }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-3xl transition-all hover:scale-105 min-w-[90px] ${
                      isSelected ? '' : 'opacity-30'
                    }`}
                  >
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 mb-1 transition-colors ${
                      isSelected ? 'text-[#0B4943]' : 'text-[#0B4943]'
                    }`} />
                    <span className={`text-sm md:text-base font-bold font-japanese whitespace-nowrap transition-colors ${
                      isSelected ? 'text-[#0B4943] border-b-2 border-[#FF6B1A]' : 'text-[#0B4943]'
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
          <div ref={menuSectionRef} className="max-w-5xl mx-auto">
          <div className="bg-[#FFF7E3] rounded-3xl shadow-md p-6 md:p-10">
            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-center text-2xl md:text-3xl font-black text-[#0D4D4D] mb-2 font-japanese">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-center text-base md:text-lg text-[#FF6B1A] font-bold font-japanese mt-2">
                {selectedCategory === 'specialty' && '当店自慢の看板メニュー'}
                {selectedCategory === 'steak' && '豪快にジューシーに、肉の旨みを堪能'}
                {selectedCategory === 'donburi-teishoku' && 'ボリューム満点！満腹間違いなし'}
                {selectedCategory === 'curry' && '濃厚カレー＆熱々ドリア'}
                {selectedCategory === 'noodles' && '濃厚ソースが絡む自慢の麺料理'}
                {selectedCategory === 'pizza' && 'カリッと香ばしく、焼きたてアツアツ'}
                {selectedCategory === 'appetizers' && 'シェアして楽しむ、おつまみ＆一品料理'}
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
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2 font-japanese">
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
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2 font-japanese">
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
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2 font-japanese">
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
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2 font-japanese">
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
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2 font-japanese">
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
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2 font-japanese">
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
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2 font-japanese">
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
                {/* Special highlight box for 飲み放題 */}
                <div className="bg-[#FFFFFF] border-2 border-[#0D4D4D] rounded-xl p-6 md:p-8 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                      <h4 className="text-lg md:text-2xl font-black text-[#0D4D4D] font-japanese">
                        🍻 飲み放題 (90分)
                      </h4>
                      <p className="text-xl md:text-3xl font-black text-black">
                        ¥2,100
                      </p>
                    </div>
                    <div className="space-y-2 text-xs md:text-base text-black font-japanese">
                      <p className="flex items-start">
                        <span className="text-[#FF6B1A] mr-2 font-bold">✓</span>
                        <span>日本酒以外のドリンク全メニューOK</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-[#FF6B1A] mr-2 font-bold">✓</span>
                        <span>お一人様1品以上のフードオーダー</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-[#FF6B1A] mr-2 font-bold">✓</span>
                        <span>5名様以上のご利用は前日までのご予約必須</span>
                      </p>
                    </div>
                  </div>
                </div>

                {drinksMenu.map((category, categoryIndex) => (
                  <div key={category.id}>
                    {/* Skip nomihoudai in the regular list */}
                    {category.id === 'nomihoudai' ? null : (
                      <>
                        {/* Category Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-black mb-6 font-japanese">
                          {category.category}
                        </h3>
                        
                        {/* Drinks in Category */}
                        <div className="space-y-8 pl-4">
                          {category.drinks.map((drink) => (
                        <div key={drink.id}>
                          <div>
                            <h4 className="text-base md:text-lg font-semibold text-black mb-2 font-japanese">
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
                      </>
                    )}
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

        {/* Price Notice */}
        <div className="max-w-4xl mx-auto mt-8 px-4">
          <div className="text-left text-sm md:text-base text-gray-600 font-japanese space-y-1">
            <p>※ 表示価格はすべて税込みです</p>
            <p>※ 日によって価格や盛り付けが変わる場合がございます</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
