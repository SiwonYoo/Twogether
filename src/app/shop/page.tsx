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

export default function ShopPage() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-480px)]">
      <h2>카테고리를 클릭하여 상품별 카테고리를 즐겨주세요</h2>
    </div>
  );
}
