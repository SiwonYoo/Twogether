'use client';

import OrderItemCard from '@/components/order/OrderItemCard';
import useCartStore from '@/stores/useCartStore';

export default function OrderListSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg">주문상품 {3}개</h2>

      <ul className="flex flex-col gap-4">
        <li>
          <OrderItemCard />
        </li>
        <li>
          <OrderItemCard />
        </li>
        <li>
          <OrderItemCard />
        </li>
      </ul>
    </section>
  );
}
