'use client';

import ProductTypeList from '@/app/shop/ProductTypeList';
import { usePathname } from 'next/navigation';
export default function ProductTypeLayout() {
  const path = usePathname();

  // 1path를 '/' 기준으로 나눔
  const segments = path.split('/').filter(Boolean);
  // segments 예: ['shop', 'shortSleeve', '456']

  // 조건: shop/[prductType]/{id} 형식 확인
  const isProductDetail = segments[0] === 'shop' && segments.length >= 3;

  return <>{isProductDetail ? <></> : <ProductTypeList />}</>;
}
