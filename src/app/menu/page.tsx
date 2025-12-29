import Link from 'next/link';

export default function MenuPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FFF7E3] px-4">
      <h1 className="text-2xl md:text-4xl font-black text-primary-green mb-6 font-japanese">Menu</h1>
      <p className="text-lg md:text-2xl font-bold text-primary-orange font-japanese text-center mb-8">
        ページが完成するまでしばらくお待ちください
      </p>
      <Link
        href="/"
        className="inline-block bg-primary-green text-white font-black text-lg md:text-xl px-6 py-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all font-japanese"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
