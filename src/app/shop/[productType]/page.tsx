import ProductCardItemLayout from '@/app/shop/[productType]/ProductCardItemLayout';
import ProductLayout from '@/components/product/ProductLayout';
import { getProduct } from '@/data/functions/shop';

export interface ListPageProps {
  params: Promise<{
    productType: string;
  }>;
}
export default async function productPage({ params }: ListPageProps) {
  const { productType } = await params;
  const data = await getProduct();

  return (
    <>
      <ProductLayout productType={productType} />
      {data.ok === 1 && (
        <>
          <ProductCardItemLayout productType={productType} data={data} />
        </>
      )}
      {data.ok === 0 && (
        <div>
          <div>{data.message}</div>
        </div>
      )}
    </>
  );
}
