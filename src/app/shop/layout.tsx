import Image from 'next/image';
import Link from 'next/link';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ul className="flex justify-between items-center gap-2 text-center">
        <li>
          <Link href="/shop/shortSleeve" className="flex flex-col justify-center items-center">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/short-sleeve/03/detail-2.png"
                className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>

            <p>short</p>
          </Link>
        </li>
        <li>
          <Link href="/shop/longSleeve" className="flex flex-col justify-center items-center ">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/long-sleeve/03/detail-1.png"
                className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>
            <p>long</p>
          </Link>
        </li>
        <li>
          <Link href="/shop/robe" className="flex flex-col justify-center items-center ">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/robe/03/detail-1.png"
                className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>
            <p>robe</p>
          </Link>
        </li>
        <li>
          <Link href="/shop/acc" className="flex flex-col justify-center items-center ">
            <p className="bg-(--color-gray-150) rounded-full p-4">
              <Image
                src="/images/products/acc/01/detail-1.png"
                className="w-full"
                width="100"
                height="100"
                alt="여성 잠옷 모델 이미지"
              />
            </p>
            <p>acc</p>
          </Link>
        </li>
      </ul>
      <main className="mx-4 mb-4">
        <>{children}</>
      </main>
    </>
  );
}
