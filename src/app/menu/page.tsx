import { Judson } from 'next/font/google';
import { Metadata } from 'next';
import Link from 'next/link';
import LinkButton from '@/components/common/LinkButton';

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
      <ul className="grid grid-cols-2 gap-4 items-center">
        <li className="ml-4">
          <Link href="/shop/best" className={`${JudsonFont.className}`}>
            BEST
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/shop/sale" className={`${JudsonFont.className}`}>
            SALE
          </Link>
        </li>
      </ul>
      <h2 className={`${JudsonFont.className} mb-5 mt-10 text-4xl`}>SHOP</h2>
      <ul className="grid grid-cols-2 gap-4 items-center">
        <li className="ml-4">
          <Link href="/shop" className={`${JudsonFont.className}`}>
            ALL
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/shop" className={`${JudsonFont.className}`}></Link>
        </li>
        <li className="ml-4">
          <Link href="/shop/shortSleeve" className={`${JudsonFont.className}`}>
            SHORT-SLEEVE
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/shop/longSleeve" className={`${JudsonFont.className}`}>
            LONG-SLEEVE
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/shop/robe" className={`${JudsonFont.className}`}>
            ROBE
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/shop/acc" className={`${JudsonFont.className}`}>
            ACC
          </Link>
        </li>
      </ul>

      <h2 className={`${JudsonFont.className} mb-5 mt-10 text-4xl`}>COMMUNITY</h2>
      <ul className="grid grid-cols-2 gap-4 items-center">
        <li className="ml-4">
          <Link href="/community/notice" className={`${JudsonFont.className}`}>
            NOTICE
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/community/event" className={`${JudsonFont.className}`}>
            EVENT
          </Link>
        </li>
      </ul>
      <h2 className={`${JudsonFont.className} mb-5 mt-10 text-4xl`}>BRAND</h2>
      <ul className="grid grid-cols-2 gap-4 items-center">
        <li className="ml-4">
          <Link href="/brand" className={`${JudsonFont.className}`}>
            ABOUT US
          </Link>
        </li>
      </ul>
      <section className="my-10">
        <h2 className="font-bold mb-4">고객센터 운영시간</h2>
        <p className="text-sm">오전 10시 ~ 17시 (토,일, 공휴일 휴무)</p>
        <p className="text-sm mb-4">rn5184@naver.com</p>
        <LinkButton href="https://github.com/FRONTENDBOOTCAMP-13th/Final-02-Twogether">GITHUB</LinkButton>
      </section>
    </main>
  );
}
