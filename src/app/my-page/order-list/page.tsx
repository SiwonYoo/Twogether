import { orderList } from '@/app/my-page/order-list/dummydata';
import OrderSummaryCard from '@/app/my-page/order-list/OrderSummaryCard';
import { Metadata } from 'next';
import { getOrders } from '@/data/functions/order';
import OrderFetcher from '@/app/my-page/order-list/OrderFetcher';
import { Judson } from 'next/font/google';

export const metadata: Metadata = {
  title: '주문 내역 - Twogether',
  description: 'Twogether의 주문 내역 확인 페이지입니다.',

  openGraph: {
    title: '주문 내역 - Twogether',
    description: 'Twogether의 주문 내역 확인 페이지입니다.',
    url: '/my-page/order-list',
  },
};

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

async function OrderList() {
  return (
    <>
      <main className="mx-4">
        <h2 className={`mb-6 text-2xl text-center ${JudsonFont.className}`}>ORDER HISTORY</h2>

        <div className="mb-20">
          <OrderFetcher />
        </div>
      </main>
    </>
  );
}

export default OrderList;
