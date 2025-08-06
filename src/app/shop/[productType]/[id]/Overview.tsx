import { ProductDetails } from '@/types/product';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import Image from 'next/image';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export default function OverviewPage({ productType, product }: ProductDetails) {
  return (
    <>
      <div>
        <h2 className={`${JudsonFont.className} font-bold text-4xl text-center text-(--color-primary)`}>Twogether</h2>
        <p className="text-center my-4">{product.content}</p>
        <ul className="flex flex-col gap-4  w-full">
          {product.mainImages.map((item) => {
            return (
              <li key={item._id}>
                <Image
                  src={item.path}
                  alt={product.content === '' ? '' : `${product.content}`}
                  width="500"
                  height="1197"
                  className="w-full"
                />
              </li>
            );
          })}
        </ul>
        <div className="my-6">
          <h3 className="mb-4 font-bold text-2xl">{product.name}</h3>
          <p>{product.content}</p>
        </div>

        <ul className="flex flex-col gap-4  w-full">
          {product.extra.productImg.map((item, index) => (
            <li key={`productImg-${index}`}>
              <Image src={item} width={1000} height={1000} alt="상품 설명" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
