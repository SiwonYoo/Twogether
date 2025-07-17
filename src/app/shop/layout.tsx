import Image from 'next/image';
import Link from 'next/link';

import { Judson } from 'next/font/google'; // 구글 폰트 사용

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ul className="grid grid-cols-5 justify-between items-center gap-2 text-center">
        <li>
          <Link href="/shop/shortSleeve" className="flex flex-col justify-center items-center gap-2">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/short-sleeve/02/detail-1_nukki.png"
                // className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>

            <p className={`${JudsonFont.className}`}>BEST</p>
          </Link>
        </li>
        <li>
          <Link href="/shop/shortSleeve" className="flex flex-col justify-center items-center gap-2">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/short-sleeve/03/detail-2.png"
                className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>

            <p className={`${JudsonFont.className}`}>short</p>
          </Link>
        </li>
        <li>
          <Link href="/shop/longSleeve" className="flex flex-col justify-center items-center gap-2 ">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/long-sleeve/03/detail-1.png"
                className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>
            <p className={`${JudsonFont.className}`}>long</p>
          </Link>
        </li>
        <li>
          <Link href="/shop/robe" className="flex flex-col justify-center items-center gap-2 ">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/robe/03/detail-1.png"
                className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>
            <p className={`${JudsonFont.className}`}>robe</p>
          </Link>
        </li>
        <li>
          <Link href="/shop/acc" className="flex flex-col justify-center items-center gap-2 ">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/acc/01/detail-1.png"
                className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>
            <p className={`${JudsonFont.className}`}>acc</p>
          </Link>
        </li>
      </ul>
      <main className="mx-4 mb-4">
        <>{children}</>
      </main>
    </>
  );
}
