import { Metadata } from 'next';
import { Judson } from 'next/font/google'; // 구글 폰트 사용

import EventSlider from '@/app/eventSlider';
import Button from '@/components/common/Button';
import ProductCard from '@/components/product/ProductCard';

import Image from 'next/image';
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
        className="w-full"
        width="480"
        height="322"
        alt="여성 잠옷 모델 이미지"
      />
      <main className="text-center px-4">
        {/* 배스트 섹션 시작 */}
        <section className="mt-6">
          <h2 className={`text-2xl font-bold my-6 ${JudsonFont.className}`}>BEST</h2>
          <div className="relative mt-4">
            <div className="h-[21.875rem] overflow-hidden">
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
              <Link href="/shop/best">
                <Button>go best</Button>
              </Link>
            </div>
          </div>
          <ProductCard />
        </section>
        {/* 배스트 섹션 종로 */}

        {/* 세일 섹션 시작 */}
        <section className="mt-6">
          <h2 className={`text-2xl font-bold my-6 ${JudsonFont.className}`}>SALE</h2>
          <div className="relative mt-4">
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
              <Link href="/shop/sale">
                <Button>버튼</Button>
              </Link>
            </div>
          </div>
          <ProductCard />
        </section>
        {/* 세일 섹션 종료 */}

        {/* 이벤트 섹션 시작 */}
        <section className="mt-6">
          <h2 className={`text-2xl font-bold my-6 ${JudsonFont.className}`}>EVENT</h2>
          <EventSlider />
        </section>
        {/* 이벤트 섹션 종료 */}

        {/* 인포 섹션 시작 */}
        <section className="mt-6">
          <h2 className={`text-2xl font-bold my-6 ${JudsonFont.className}`}>INFO</h2>
          <div className="my-2">
            <h3 className="font-bold mb-2">신규회원 5% 쿠폰</h3>
            <p className="text-[.75rem]">즉시 사용 5% 쿠폰 발급</p>
            <p className="text-[.75rem]">회원가입하러가기</p>
          </div>
          <div className="my-2">
            <h3 className="font-bold mb-2">리뷰퀸 적립금</h3>
            <p className="text-[.75rem]">리뷰퀸 선정 최대 5,000원 적립금</p>
            <p className="text-[.75rem]">매월 세 분께 증정합니다</p>
          </div>
          <div className="my-2">
            <h3 className="font-bold mb-2">무료배송</h3>
            <p className="text-[.75rem]">전상품 5만원 이상 결제시 무료배송</p>
            <p className="text-[.75rem]">인기제품 보러가기</p>
          </div>
        </section>
        {/* 인포 섹션 종료 */}
      </main>
    </>
  );
}
