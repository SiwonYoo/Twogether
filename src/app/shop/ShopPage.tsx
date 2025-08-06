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

  if (errorMessage) {
    return (
      <div className="font-bold text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4">
        <p className="text-3xl mb-4">고객님, 정말 죄송합니다.</p>
        <p className="text-gray-500">현재 보여드릴 상품이 없어 불편을 드리게 된 점 진심으로 사과드립니다.</p>
        <p className="text-gray-500 my-2">상품 준비에 차질이 생겨 기다리시게 해 드린 점, 대단히 송구스럽습니다.</p>
        <p className="text-gray-500">
          최대한 빠른 시일 내에 새로운 상품을 갖추어 다시 찾아뵐 수 있도록 최선을 다하겠습니다.
        </p>
        <p className="text-gray-500 mb-4 mt-2">이용에 불편을 드린 점 깊이 반성하며, 너그러운 양해를 부탁드립니다.</p>
        <LinkButton href="/">홈으로 바로가기</LinkButton>
      </div>
    );
  }

  return (
    <>
      <h2 className={`${JudsonFont.className} text-2xl`}>ALL</h2>
      <ul className="grid grid-cols-2 gap-4 my-6">
        {product.map((item) => {
          return <ProductCardItem key={item._id} productType={item.extra.category} data={[item]} />;
        })}
      </ul>
    </>
  );
}
