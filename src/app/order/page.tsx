import OrderForm from '@/components/order/OrderForm';

interface OrderPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default function OrderPage({ searchParams }: OrderPageProps) {
  const isDirect = searchParams.direct === 'true';
  const product_id = Number(searchParams.product_id);

  return (
    <main className="mx-4 mb-4 flex flex-col gap-6">
      <OrderForm isDirectlyOrdered={isDirect} directlyOrderedProductId={product_id} />
    </main>
  );
}
