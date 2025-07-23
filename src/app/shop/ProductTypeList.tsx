import Image from 'next/image';
import Link from 'next/link';

import { Judson } from 'next/font/google'; // 구글 폰트 사용

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});
export default function ProductTypeList() {
  const data = [
    {
      _id: 1,
      value: 'BEST',
      link: 'best',
      image: '/images/products/short-sleeve/02/detail-1_nukki.png',
      alt: 'BEST 상품입니다.',
    },
    {
      _id: 2,
      value: 'SALE',
      link: 'sale',
      image: '/images/products/short-sleeve/03/detail-2.png',
      alt: 'SALE 상품입니다.',
    },
    {
      _id: 3,
      value: 'SHORT',
      link: 'shortSleeve',
      image: '/images/products/short-sleeve/05/detail-1.png',
      alt: 'SHORT 상품입니다.',
    },
    {
      _id: 4,
      value: 'LONG',
      link: 'longSleeve',
      image: '/images/products/long-sleeve/03/detail-1.png',
      alt: 'LONG 상품입니다.',
    },
    { _id: 5, value: 'ROBE', link: 'robe', image: '/images/products/robe/03/detail-1.png', alt: 'ROBE 상품입니다.' },
    { _id: 6, value: 'ACC', link: 'acc', image: '/images/products/acc/01/detail-1.png', alt: 'ACC 상품입니다.' },
  ];

  return (
    <>
      <ul className="grid grid-cols-3 grid-row-3 justify-between items-center gap-2 text-center mx-4">
        {data.map((item) => {
          return (
            <li key={item._id}>
              <Link href={`/shop/${item.link}`} className="flex flex-col justify-center items-center gap-2">
                <p className="bg-(--color-gray-150) rounded-full p-4">
                  <Image
                    src={`${item.image}`}
                    // className="w-full"
                    width="50"
                    height="50"
                    alt={item.alt}
                  />
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
