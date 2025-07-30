import { orderList } from '@/app/my-page/order-list/dummydata';
import OrderSummaryCard from '@/app/my-page/order-list/OrderSummaryCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주문 내역 - Twogether',
  description: 'Twogether의 주문 내역 확인 페이지입니다.',

  openGraph: {
    title: '주문 내역 - Twogether',
    description: 'Twogether의 주문 내역 확인 페이지입니다.',
    url: '/my-page/order-list',
  },
};

function OrderList() {
  return (
    <>
      <main className="mx-4">
        <div className="mb-20">
          {orderList.map((orderdetail) => (
            <OrderSummaryCard
              key={orderdetail._id}
              _id={orderdetail._id}
              date={orderdetail.createdAt}
              products={orderdetail.products}
            ></OrderSummaryCard>
          ))}
        </div>
      </main>
    </>
  );
}

export default OrderList;
