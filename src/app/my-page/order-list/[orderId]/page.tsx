import OrderDetailFetcher from '@/app/my-page/order-list/[orderId]/OrderDetailFetcher';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ orderId: number }> }): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: '주문 상세 조회 - Twogether',
    description: 'Twogether의 주문 상세 조회 페이지입니다.',

    openGraph: {
      title: '주문 상세 조회 - Twogether',
      description: 'Twogether의 주문 상세 조회 페이지입니다.',
      url: `/my-page/order-list/${orderId}`,
    },
  };
}

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
