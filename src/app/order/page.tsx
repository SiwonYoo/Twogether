import OrderForm from '@/components/order/OrderForm';

export default function OrderPage() {
  // 나중에 DB 연결시 서버에서 데이터 fetch하기!
  const shippingData = {
    name: '김멋사',
    address: '서울 종로구 종로3길 17 D1동 16층, 17층[03155]',
    phone: '010-1234-5678',
  };

  return (
    <main className="mx-4 mb-4 flex flex-col gap-6">
      <OrderForm shippingData={shippingData} />
    </main>
  );
}
