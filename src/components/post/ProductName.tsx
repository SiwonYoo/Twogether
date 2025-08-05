'use client';

import { useEffect, useState } from 'react';
import { getProductById } from '@/data/functions/shop';
import { Product } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductName({ productId }: { productId: number }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        // 특정 상품만 가져오기
        const res = await getProductById(productId);

        if (res.ok) {
          setProduct(res.item);
          setError(null);
        } else {
          setError(res.message);
          setProduct(null);
        }
      } catch (err) {
        setError('상품 정보를 불러오는데 실패했습니다.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  // 로딩 중
  if (loading) {
    return (
      <div className="flex items-center gap-4 h-25 p-4">
        <p>상품 정보 로딩중...</p>
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div className="flex items-center gap-4 h-25 p-4 bg-gray-150">
        <p className="text-primary">{error}</p>
      </div>
    );
  }

  // 상품을 찾을 수 없음
  if (!product) {
    return (
      <div className="flex items-center gap-4 h-25 p-4 bg-gray-150">
        <p>상품을 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 정상적인 상품 정보 표시
  return (
    <Link href={`/shop/${product.extra?.category || 'unknown'}/${productId}`}>
      <div className="flex gap-4 p-4  border-1 border-gray-150">
        <Image
          src={`${product.mainImages[0].path}`}
          alt={product.name}
          width={100}
          height={100}
          priority
          className="bg-white"
        />
        <div className="flex flex-col flex-1">
          <p>{product.name}</p>
          <p className="text-gray-250 text-sm">사이즈 {product.extra.size[0].value}</p>
          <p className="text-lg font-bold mt-auto">{product.price.toLocaleString()}원</p>
        </div>
      </div>
    </Link>
  );
}
