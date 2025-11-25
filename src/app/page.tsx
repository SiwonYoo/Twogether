import { Metadata } from 'next';
import { Judson } from 'next/font/google'; // 구글 폰트 사용

import EventSlider from '@/app/eventSlider';

import Image from 'next/image';
import ProductMainPage from '@/app/ProductMainPage';
import LinkButton from '@/components/common/LinkButton';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Twogether',
  openGraph: {
    title: 'Twogether',
    description:
      'Twogether는 편안함과 감각적인 디자인을 담은 잠옷 전문 쇼핑몰입니다. 당신의 밤을 더욱 특별하고 아늑하게 만들어 줄 다양한 잠옷을 만나보세요.',
    url: '/',
  },
};

export default function Home() {
  return (
    <>
      <Image
        src="/images/model/main-model1.png"
        className="w-full lg:h-100 object-cover object-top"
        width="900"
        height="900"
        alt="여성 잠옷 모델 이미지"
      />
      <main className="text-center flex flex-col gap-5 mt-5 mb-20">
        {/* 배스트 섹션 시작 */}
        <section>
          <h2 className={`text-2xl font-bold my-6 ${JudsonFont.className} lg:hidden`}>BEST</h2>
          <div className="lg:flex">
            <div className="flex-1 relative mt-4">
              <div className="h-[21.875rem] lg:h-80 overflow-hidden">
                <Image
                  src="/images/model/main-model3.png"
                  className="w-full h-full object-cover scale-120 relative right-10 top-10"
                  width="888"
                  height="422"
                  alt="여성 잠옷 모델 이미지"
                />
              </div>
              <div className="absolute right-[2.625rem] top-1/2 -translate-y-1/2 text-white">
                <p className={`${JudsonFont.className} text-2xl font-bold`}>Twogether</p>
                <p className={`${JudsonFont.className} text-2xl mb-4`}>The Last Episode</p>
                <LinkButton href="/shop/best" lang="eng">
                  GO BEST
                </LinkButton>
              </div>
            </div>

            <ul className="flex-1 grid grid-cols-2 gap-4 my-6 mx-4">
              <ProductMainPage category="best" />
            </ul>
          </div>
        </section>
        {/* 배스트 섹션 종로 */}

        {/* 세일 섹션 시작 */}
        <section>
          <h2 className={`text-2xl font-bold my-6 ${JudsonFont.className} lg:hidden`}>SALE</h2>
          <div className="relative mt-4 lg:hidden">
            <div className="h-[21.875rem] overflow-hidden">
              <Image
                src="/images/model/main-model2.png"
                className="w-full h-full object-cover relative scale-120 left-10 top-10"
                width="888"
                height="452"
                alt="여성 잠옷 모델 이미지"
              />
            </div>
            <div className="absolute left-[2.625rem] top-1/2 -translate-y-1/2 text-white">
              <p className={`${JudsonFont.className} text-2xl font-bold`}>Twogether</p>
              <p className={`${JudsonFont.className} text-2xl mb-4`}>The Last Episode</p>
              <LinkButton href="/shop/best" lang="eng">
                TO SALE
              </LinkButton>
            </div>
          </div>

          <div className="lg:flex">
            <ul className="flex-1 grid grid-cols-2 gap-4 my-6 mx-4">
              <ProductMainPage category="sale" />
            </ul>
            <div className="flex-1 relative mt-4 max-lg:hidden">
              <div className="lg:h-80 overflow-hidden">
                <Image
                  src="/images/model/main-model2.png"
                  className="w-full h-full object-cover relative scale-120 left-10 top-10"
                  width="888"
                  height="452"
                  alt="여성 잠옷 모델 이미지"
                />
              </div>
              <div className="absolute left-[2.625rem] top-1/2 -translate-y-1/2 text-white">
                <p className={`${JudsonFont.className} text-2xl font-bold`}>Twogether</p>
                <p className={`${JudsonFont.className} text-2xl mb-4`}>The Last Episode</p>
                <LinkButton href="/shop/best" lang="eng">
                  TO SALE
                </LinkButton>
              </div>
            </div>
          </div>
        </section>
        {/* 세일 섹션 종료 */}

        {/* 전체 섹션 시작 (PC) */}
        <section>
          <ul className="flex-1 grid grid-cols-4 gap-4 my-6 mx-4 max-lg:hidden">
            <ProductMainPage category="all" />
          </ul>
        </section>
        {/* 전체 섹션 시작 (PC) */}

        {/* 이벤트 섹션 시작 */}
        <section>
          <h2 className={`text-2xl font-bold my-6 ${JudsonFont.className}`}>EVENT</h2>
          <div className="mx-4">
            <EventSlider />
            <Link href={'/community/event'} className="block mt-4 text-right hover:underline">
              이벤트 더보기
            </Link>
          </div>
        </section>
        {/* 이벤트 섹션 종료 */}
      </main>
    </>
  );
}
