import Image from 'next/image';
import { Judson } from 'next/font/google';
import { Metadata } from 'next';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: '브랜드 소개 - Twogether',
  openGraph: {
    title: '브랜드 소개 - Twogether',
    description: '브랜드 소개',
    url: '/brand',
  },
};

export default function BrandPage() {
  return (
    <main>
      <Image src="/images/model/main-model1.png" alt="브랜드 모델" width={768} height={512} className="w-full h-auto" />
      <section className="mb-12 mt-12">
        <h2 className={`${JudsonFont.className} text-2xl`}>Twogether</h2>
        <p className="mt-4">하루를 함께 마무리하고</p>
        <p>
          함께 시작하는 <strong>당신의 밤을 위한 브랜드</strong>입니다.
        </p>
        <br />
        <p>잠옷은 단순한 옷이 아닌</p>
        <p>가장 편안하고 가장 나다운 시간이 머무는 공간의 일부입니다.</p>
        <br />
        <p>그래서 우리는</p>
        <p>그 밤이 더 따뜻하고 부드럽게 감싸지길 바라며</p>
        <p>정성스럽게 만들기 시작했습니다.</p>
      </section>
      <Image src="/images/model/main-model2.png" width={768} height={500} alt="브랜드 모델" />
      <section className="flex flex-col justify-center items-center mb-12 mt-12">
        <h2 className={`${JudsonFont.className} text-2xl`}>Twogether, </h2>
        <p>당신의 밤과 함께</p>
        <p className="mt-6 mb-3 font-bold">하루의 끝을 위한 편안함</p>
        <p>피부에 닿는 감촉, 여유로운 핏</p>
        <p>하루의 피로를 내려놓기에는 충분합니다.</p>
        <p className="mt-6 font-bold">취향을 담은 디자인</p>
        <p>당신의 취향을 해치지 않는</p>
        <p>미니멀하고 감각적인 스타일을 제안합니다.</p>
        <p className="mt-6 font-bold">믿을 수 있는 소재와 제작</p>
        <p>자연에 가까운 소재와 섬세한 봉제</p>
        <p>꼼꼼한 제작 과정을 통해 신뢰를 만듭니다.</p>
      </section>
      <div className="relative">
        <Image src="/images/model/main-model3.png" width={768} height={500} alt="브랜드 모델" />
        <p className={`absolute bottom-5 ${JudsonFont.className} text-2xl text-white`}>Twogether</p>
      </div>
    </main>
  );
}
