'use client';

import { Order } from '@/types';
import { useEffect, useState } from 'react';
import { getOrders } from '@/data/functions/order';
import OrderSummaryCard from '@/app/my-page/order-list/OrderSummaryCard';

export default function OrderFetcher() {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user');
    let accessToken = '';

    if (userLocalStorage) {
      try {
        const parsed = JSON.parse(userLocalStorage);
        accessToken = parsed?.state?.user?.token?.accessToken;
      } catch (err) {}
    }

    async function fetchOrder() {
      if (!accessToken) return;

      try {
        const res = await getOrders(accessToken);

        if (res.ok && res.item) {
          setOrders(res.item);
        }
      } catch (err) {}
    }

    fetchOrder();
  }, []);

  // 주문의 products 배열을 하나씩 카드로 표시
  return (
    <div>
      {orders?.map((order) => (
        <OrderSummaryCard
          key={order._id}
          _id={order._id}
          date={order.createdAt.split(' ')[0]}
          products={order.products}
        />
      ))}
    </div>
  );
}
