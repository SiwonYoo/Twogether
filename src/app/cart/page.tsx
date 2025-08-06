import { Metadata } from 'next';
import Button from '@/components/common/Button';
import CartListSection from '@/components/cart/CartListSection';
import InfoSection from '@/components/cart/InfoSection';
import PriceDetailsSection from '@/components/cart/PriceDetailsSection';
import CartForm from '@/components/cart/CartForm';

export const metadata: Metadata = {
  title: '장바구니 - Twogether',
  openGraph: {
    title: '장바구니 - Twogether',
    description: '장바구니',
    url: '/cart',
  },
};

export default function CartPage() {
  return (
    <main className="mx-4 mb-4">
      {/* 장바구니 상품 목록 */}
      <CartListSection />

      {/* 이용 안내 */}
      <InfoSection />

      {/* 가격 상세 정보 */}
      <PriceDetailsSection where="cart" />

      {/* 선택 상품 주문 버튼 */}
      <CartForm />
    </main>
  );
}
