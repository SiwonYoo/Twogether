import { Metadata } from 'next';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import Image from 'next/image';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export const metadata: Metadata = {
  title: '상품 상세페이지 - Twogether',
  openGraph: {
    title: '상품 상세페이지 - Twogether',
    description: '코튼캔디 순면 반팔 상하의 세트 - Twogether',
    url: '/shop/shortSleeve/11212',
  },
};

export default function Overview() {
  const data = [
    {
      _id: 1,
      title: '코튼캔디 순면 반팔 상하의 세트(남녀공용)',
      onLineContant: '코튼캔디 순면 반팔 상하의 세트',
      contant: `Twogether의 첫번째 컬렉션.
      베이직 실루엣의 스탠다드 파자마로, 착용했을 때의 가장 편한 패턴을 연구해 제작된 디자인입니다.`,
    },
  ];

  return (
    <>
      {data.map((itme, index) => (
        <div key={index}>
          <h2 className={`${JudsonFont.className} font-bold text-4xl text-center text-(--color-primary)`}>Twogether</h2>
          <p className="text-center my-4">{itme.onLineContant}</p>
          <Image
            src={`/images/products/long-sleeve/03/model-${itme._id}.jpg`}
            alt={itme.onLineContant}
            width="1000"
            height="1197"
          />
          <div className="my-6">
            <h3 className="mb-4">{itme.title}</h3>
            <p>{itme.contant}</p>
          </div>
          <Image
            src={`/images/products/long-sleeve/03/model-${itme._id + 1}.jpg`}
            alt={itme.onLineContant}
            width="1000"
            height="1197"
          />
          <Image
            src={`/images/products/long-sleeve/03/model-${itme._id + 2}.jpg`}
            alt={itme.onLineContant}
            width="1000"
            height="1197"
          />
          <Image
            src={`/images/products/long-sleeve/03/model-${itme._id + 3}.jpg`}
            alt={itme.onLineContant}
            width="1000"
            height="1197"
          />
        </div>
      ))}
    </>
  );
}
