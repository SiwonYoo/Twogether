import ProductCardItemLayout from '@/app/shop/[productType]/ProductCardItemLayout';
import ProductLayout from '@/components/product/ProductLayout';
import { getProducts } from '@/data/functions/shop';
import { Metadata } from 'next';

export interface ListPageProps {
  params: Promise<{
    productType: string;
    id: number;
  }>;
}

export async function generateMetadata({ params }: ListPageProps): Promise<Metadata> {
  const { productType, id } = await params;
  const customQuery = encodeURIComponent(
    JSON.stringify({
      _id: id,
      'extra.category': productType,
    })
  );
  const data = await getProducts(customQuery);

  // 타입체크
  if (data.ok === 0) {
    return {};
  }

  // data.ok === 1 일시 동작
  return {
    title: `${productType} - Twogether`,
    description: `스타일리시한 ${productType}, 지금 Twogether에서 확인해보세요.`,
    openGraph: {
      title: `${productType} - Twogether`,
      description: `스타일리시한 ${productType}, 지금 Twogether에서 확인해보세요.`,
      url: `/shop/${productType}`,
    },
  };
}

export default async function productPage({ params }: ListPageProps) {
  const { productType, id } = await params;
  const customQuery = encodeURIComponent(
    JSON.stringify({
      _id: id,
      'extra.category': productType,
    })
  );
  const data = await getProducts(customQuery);
  console.log(data.ok === 1 && data.item);

  if (data.ok === 0) {
    return (
      <div>
        {/* 아래 코드는 테스틀 위한 장치 지워야함 */}
        <>{data.message}</>
        {/* 실제 사용자들에게 표시될 화면 */}
        <></>
      </div>
    );
  }

  return (
    <>
      <ProductLayout productType={productType} />

      <ProductCardItemLayout productType={productType} data={data.item} />
    </>
  );
}
