import ProductCardItemLayout from '@/app/shop/[productType]/ProductCardItemLayout';
import LinkButton from '@/components/common/LinkButton';
import ProductLayout from '@/components/product/ProductLayout';
import { getProducts } from '@/data/functions/shop';
import { Metadata } from 'next';

export interface ListPageProps {
  params: Promise<{
    productType: string;
    id: string;
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
  const { productType } = await params;
  let customQuery = '';

  if (productType === 'best') {
    customQuery = encodeURIComponent(JSON.stringify({ 'extra.isBest': true }));
  } else if (productType === 'sale') {
    customQuery = encodeURIComponent(JSON.stringify({ 'extra.isSale': true }));
  } else if (productType === 'all') {
    customQuery = encodeURIComponent(JSON.stringify({}));
  } else {
    customQuery = encodeURIComponent(JSON.stringify({ 'extra.category': `${productType}` }));
  }

  const data = await getProducts(customQuery);

  if (data.ok === 0) {
    return (
      <div className="text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4 text-gray-500">
        <p className="text-xl mb-4 text-black">고객님, 죄송합니다.</p>
        <p>현재 보여드릴 상품이 없습니다.</p>
        <p>최대한 빠른 시일 내에 새로운 상품을 갖추어</p>
        <p className="mb-5">다시 찾아뵐 수 있도록 최선을 다하겠습니다.</p>
        <LinkButton href="/" lang="eng">
          HOME
        </LinkButton>
      </div>
    );
  }

  return (
    <>
      {/* 상품 카테고리 시작 */}
      <ProductLayout productType={productType} />
      {/* 상품 카테고리 종료 */}

      {data.item.length === 0 ? (
        <div className="text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4 text-gray-500">
          <p className="text-xl mb-4 text-black">고객님, 죄송합니다.</p>
          <p>현재 보여드릴 상품이 없습니다.</p>
          <p>최대한 빠른 시일 내에 새로운 상품을 갖추어</p>
          <p className="mb-5">다시 찾아뵐 수 있도록 최선을 다하겠습니다.</p>
          <LinkButton href="/" lang="eng">
            HOME
          </LinkButton>
        </div>
      ) : (
        <>
          {/* 상품 렌더링 시작 */}
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {data.item.map((product) => {
              return (
                <ProductCardItemLayout
                  productType={productType}
                  key={product._id ?? `prod-${Math.random()}`}
                  data={[product]}
                />
              );
            })}
          </ul>
        </>
      )}
      {/* 상품 렌더링 종료 */}
    </>
  );
}
