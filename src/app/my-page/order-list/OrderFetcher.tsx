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
        console.log('액세스 토큰 :', accessToken);
      } catch (err) {
        console.error('액세스 토큰 파싱 실패', err);
      }
    }

    async function fetchOrder() {
      if (!accessToken) return;

      try {
        const res = await getOrders(accessToken);
        console.log('주문 내역 데이터 :', res);

        if (res.ok && res.item) {
          setOrders(res.item);
        }
      } catch (err) {
        console.error('주문 내역 API 호출 실패', err);
      }
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
