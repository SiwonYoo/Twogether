import Image from 'next/image';
import Link from 'next/link';
import { Judson } from 'next/font/google'; // 구글 폰트 사용

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

interface ProductLayoutProps {
  productType: string;
}

export default function ProductLayout({ productType }: ProductLayoutProps) {
  const data = [
    {
      _id: 1,
      value: 'SHORT',
      link: 'shortSleeve',
      image: '/images/products/shortSleeve/5/detail-1.png',
      alt: 'SHORT 상품입니다.',
    },
    {
      _id: 2,
      value: 'LONG',
      link: 'longSleeve',
      image: '/images/products/longSleeve/3/detail-1.png',
      alt: 'LONG 상품입니다.',
    },
    { _id: 3, value: 'ROBE', link: 'robe', image: '/images/products/robe/3/detail-1.png', alt: 'ROBE 상품입니다.' },
    { _id: 4, value: 'ACC', link: 'acc', image: '/images/products/acc/1/detail-1.png', alt: 'ACC 상품입니다.' },
  ];

  return (
    <>
      <ul className="grid grid-cols-4 gap-4">
        {data.map((item, index) => {
          return (
            <li key={index}>
              <Link href={`/shop/${item.link}`} className="flex flex-col justify-center items-center gap-2">
                <p
                  className={`${
                    productType === item.link ? 'bg-(--color-primary)' : 'bg-(--color-gray-250)'
                  } rounded-full p-4`}
                >
                  <Image src={item.image} alt={item.alt} width={100} height={100} />
                </p>
                <p className={`${JudsonFont.className}`}>{item.value}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
