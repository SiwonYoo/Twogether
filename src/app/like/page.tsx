import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';
import { Judson } from 'next/font/google'; // 구글 폰트 사용

// 폰트 사용
const JudsonFont = Judson({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// 메타 데이터
export const metadata: Metadata = {
  title: '찜 - Twogether',
  openGraph: {
    title: '찜 - Twogether',
    description: '상품의 찜 페이지입니다.',
    url: '/like',
  },
};

// api 연결 전 더미데이터 인터페이스
interface dummyDataItem {
  itemId: number;
  productTitle: string;
  price: number;
}
interface dummyDataprops {
  id: number;
  data: string;
  item: dummyDataItem[];
}

export default function LikePage() {
  // api 연결 전 더미데이터
  const dummyData: dummyDataprops[] = [
    {
      id: 1,
      data: '25.07.16',
      item: [
        {
          itemId: 1,
          productTitle: '반팔',
          price: 70000,
        },
        {
          itemId: 2,
          productTitle: '긴팔',
          price: 75000,
        },
      ],
    },
    {
      id: 2,
      data: '25.07.17',
      item: [
        {
          itemId: 1,
          productTitle: '반팔',
          price: 7000,
        },
        {
          itemId: 2,
          productTitle: '긴팔',
          price: 7000,
        },
      ],
    },
    {
      id: 3,
      data: '25.07.18',
      item: [
        {
          itemId: 1,
          productTitle: '반팔',
          price: 7000,
        },
        {
          itemId: 2,
          productTitle: '긴팔',
          price: 7000,
        },
      ],
    },
  ];

  return (
    <main className="p-4">
      <h2 className={`font-bold text-4xl ${JudsonFont.className}`}>Recently Viewed</h2>
      <ul>
        <li>
          {dummyData.map((item) => {
            return (
              <div key={item.id} className="border-b-1 border-(--color-gray-250) py-2">
                <h3 className={`font-bold text-2xl ${JudsonFont.className}`}>{item.data}</h3>
                <ul className="flex justify-between gap-4 flex-wrap items-center mt-4">
                  {item.item.map((item) => {
                    return <ProductCard key={item.itemId} productTitle={item.productTitle} price={item.price} />;
                  })}
                </ul>
              </div>
            );
          })}
        </li>
      </ul>
    </main>
  );
}
