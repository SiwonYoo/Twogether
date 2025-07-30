'use client';

import OrderItemCard from '@/components/order/OrderItemCard';
import { Cart } from '@/types';

interface OrderListSectionProps {
  orderItems: Cart[];
}
export default function OrderListSection({ orderItems }: OrderListSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg">주문상품 {orderItems.length}종</h2>

      <ul className="flex flex-col gap-4">
        {orderItems.length > 0 ? (
          orderItems.map((item) => (
            <li key={item._id}>
              <OrderItemCard cartItem={item} />
            </li>
          ))
        ) : (
          <li className="text-gray-500">선택된 상품이 없습니다.</li>
        )}
      </ul>
    </section>
  );
}
