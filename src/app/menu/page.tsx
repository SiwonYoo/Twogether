import { Judson } from 'next/font/google';
import { Metadata } from 'next';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: '메뉴 - Twogether',
  openGraph: {
    title: '메뉴 - Twogether',
    description: '메뉴',
    url: '/menu',
  },
};

export default function Menu() {
  return (
    <main className="mx-4">
      <h2 className={`${JudsonFont.className} mb-5 mt-5 text-4xl`}>SPECIAL</h2>
      <ul className="grid grid-cols-2 gap-x-24 gap-y-4 max-w-[400px]">
        <li>
          <Link href="/shop/best" className={`${JudsonFont.className} ml-8`}>
            BEST
          </Link>
        </li>
        <li>
          <Link href="/shop/sale" className={`${JudsonFont.className} ml-8`}>
            SALE
          </Link>
        </li>
      </ul>
      <h2 className={`${JudsonFont.className} mb-5 mt-10 text-4xl`}>SHOP</h2>
      <ul className="grid grid-cols-2 gap-x-24 gap-y-4 max-w-[400px]">
        <li className="ml-8">
          <Link href="/shop/shortSleeve" className={`${JudsonFont.className}`}>
            SHORT-SLEEVE
          </Link>
        </li>
        <li className="ml-8">
          <Link href="/shop/longSleeve" className={`${JudsonFont.className}`}>
            LONG-SLEEVE
          </Link>
        </li>
        <li className="ml-8">
          <Link href="/shop/robe" className={`${JudsonFont.className}`}>
            ROBE
          </Link>
        </li>
        <li className="ml-8">
          <Link href="/shop/acc" className={`${JudsonFont.className}`}>
            ACC
          </Link>
        </li>
      </ul>

      <h2 className={`${JudsonFont.className} mb-5 mt-10 text-4xl`}>COMMUNITY</h2>
      <ul className="grid grid-cols-2 gap-x-24 gap-y-4 max-w-[400px]">
        <li className="ml-8">
          <Link href="/community/notice" className={`${JudsonFont.className}`}>
            NOTICE
          </Link>
        </li>
        <li className="ml-8">
          <Link href="/community/event" className={`${JudsonFont.className}`}>
            EVENT
          </Link>
        </li>
      </ul>
      <h2 className={`${JudsonFont.className} mb-5 mt-10 text-4xl`}>BRAND</h2>
      <ul className="grid grid-cols-2 gap-x-24 gap-y-4 max-w-[400px]">
        <li className="ml-8">
          <Link href="/brand" className={`${JudsonFont.className}`}>
            ABOUT US
          </Link>
        </li>
      </ul>
      <section className="mt-25">
        <h2 className="font-bold mb-4">고객센터 운영시간</h2>
        <p className="text-sm">오전 10시 ~ 17시 (토,일, 공휴일 휴무)</p>
        <p className="text-sm">rn5184@naver.com</p>
      </section>
    </main>
  );
}
