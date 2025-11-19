'use client';
import LinkButton from '@/components/common/LinkButton';
import ProductCardItem from '@/components/product/ProductCardItem';
import { getAllProducts } from '@/data/functions/shop';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

import { Judson } from 'next/font/google';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export default function ShopPage() {
  const [product, productData] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function ProductAllPageApi() {
      try {
        const res = await getAllProducts();

        if (res.ok === 0) {
          setErrorMessage(res.message);
          return;
        }

        if (res.ok === 1) {
          productData(res.item);
        }
      } catch (e) {
        console.warn(e);
      }
    }
    ProductAllPageApi();
  }, []);

  if (errorMessage)
    return (
      <div className="text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4 text-gray-500">
        <p className="text-xl mb-4 text-black">고객님, 죄송합니다.</p>
        <p>현재 보여드릴 상품이 없습니다.</p>
        <p>최대한 빠른 시일 내에 새로운 상품을 갖추어</p>
        <p className="mb-5">다시 찾아뵐 수 있도록 최선을 다하겠습니다.</p>
        <LinkButton href="/" lang="eng">
          HOME
        </LinkButton>
      </div>
    );

  return (
    <>
      <h2 className={`${JudsonFont.className} mt-4 text-2xl`}>ALL</h2>
      <ul className="grid grid-cols-2 gap-4 my-6 mb-20">
        {product.map((item) => {
          return <ProductCardItem key={item._id} productType={item.extra.category} data={[item]} />;
        })}
      </ul>
    </>
  );
}
