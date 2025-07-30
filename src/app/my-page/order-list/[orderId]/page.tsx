import OrderDetailFetcher from '@/app/my-page/order-list/[orderId]/OrderDetailFetcher';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주문 상세 조회 - Twogether',
  openGraph: {
    title: '주문 상세 조회 - Twogether',
    description: '주문 상세 조회',
    url: '/my-page/order-list/[orderId]',
  },
};

async function OrderListDetail({ params }: { params: Promise<{ orderId: number }> }) {
  const { orderId } = await params;

  return (
    <>
      <main className="mx-4">
        <OrderDetailFetcher orderId={orderId} />
      </main>
    </>
  );
}

export default OrderListDetail;
