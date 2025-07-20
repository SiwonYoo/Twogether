'use client';
import useCartStore from '@/stores/useCartStore';
import { calculateTotalPrice, calculateDeliveryFee, calculateTotalDiscount, calculateFinalAmount } from '@/utils/cart';

export default function PriceDetailsSection() {
  // 전역 상태 연결
  const { items } = useCartStore();

  return (
    <section className="flex flex-col gap-3 p-4 border-1 mb-4">
      <div className="flex flex-row justify-between">
        <p>총 상품금액</p>
        <p>{calculateTotalPrice(items).toLocaleString()}원</p>
      </div>

      <div className="flex flex-row justify-between">
        <p>총 할인금액</p>
        <p>{calculateTotalDiscount(items).toLocaleString()}원</p>
      </div>

      <div className="flex flex-row justify-between">
        <p>배송비</p>
        <p>{calculateDeliveryFee(items).toLocaleString()}원</p>
      </div>

      <hr className="border-gray-250" />

      <div className="flex flex-row justify-between font-bold">
        <p className="">결제예정금액</p>
        <p>{calculateFinalAmount(items).toLocaleString()}원</p>
      </div>
    </section>
  );
}
