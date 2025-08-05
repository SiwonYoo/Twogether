'use client';

import SubHeader from '@/components/layout/SubHeader';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

export default function Mainlayout() {
  let useSubHeader = false;
  let title: string | undefined = undefined;

  const path = usePathname();

  // 1path를 '/' 기준으로 나눔
  // segments 예: ['shop', 'shortSleeve', '456']
  const segments = path.split('/').filter(Boolean);

  // 조건: shop/[prductType]/{id} 형식 확인
  if (segments[0] === 'shop' && segments.length >= 3) {
    useSubHeader = true;
  }

  if (path.startsWith('/my-page/review/')) {
    useSubHeader = true;
    title = '리뷰 수정';
  }
  if (path.startsWith('/my-page/order-list/')) {
    useSubHeader = true;
    title = '주문 상세 조회';
  }

  if (path.endsWith('review-post')) {
    useSubHeader = true;
    title = '리뷰 작성';
  }

  return <>{useSubHeader ? <SubHeader title={title} /> : <Header />}</>;
}
