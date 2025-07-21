import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';

// 메타데이터
export const metadata: Metadata = {
  title: '상품목록 - Twogether',
  openGraph: {
    title: '상품목록 - Twogether',
    description: '상품 목록을 확인할 수 있는 페이지입니다.',
    url: '/shop',
  },
};

// 페이지 인터페이스
export interface ListPageProps {
  params: Promise<{
    productType: string;
  }>;
}

export default async function ProductType() {
  return (
    <>
      <ProductCard />
    </>
  );
}
