import { orderList } from '@/app/my-page/order-list/dummydata';
import OrderSummaryCard from '@/app/my-page/order-list/OrderSummaryCard';
import { Metadata } from 'next';
import { getOrders } from '@/data/functions/order';
import OrderFetcher from '@/app/my-page/order-list/OrderFetcher';

export const metadata: Metadata = {
  title: '주문 내역 - Twogether',
  openGraph: {
    title: '주문 내역 - Twogether',
    description: '주문 내역',
    url: '/my-page/order-list',
  },
};

async function OrderList() {
  return (
    <>
      <main className="mx-4">
        <div className="mb-20">
          <OrderFetcher />
        </div>
      </main>
    </>
  );
}

export default OrderList;
