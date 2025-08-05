import OrderForm from '@/components/order/OrderForm';

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const isDirect = params.direct === 'true';
  const product_id = Number(params.product_id);

  return (
    <main className="mx-4 mb-4 flex flex-col gap-6">
      <OrderForm isDirectlyOrdered={isDirect} directlyOrderedProductId={product_id} />
    </main>
  );
}
