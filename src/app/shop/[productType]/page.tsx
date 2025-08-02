import ProductCardList from '@/app/shop/[productType]/ProductCardList';
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
  } else {
    customQuery = encodeURIComponent(JSON.stringify({ 'extra.category': `${productType}` }));
  }

  const data = await getProducts(customQuery);

  if (data.ok === 0) {
    return (
      <div className="font-bold text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4">
        <p className="text-3xl mb-4">고객님, 정말 죄송합니다.</p>
        <p className="text-gray-500">현재 보여드릴 상품이 없어 불편을 드리게 된 점 진심으로 사과드립니다.</p>
        <p className="text-gray-500 my-2">상품 준비에 차질이 생겨 기다리시게 해 드린 점, 대단히 송구스럽습니다.</p>
        <p className="text-gray-500">
          최대한 빠른 시일 내에 새로운 상품을 갖추어 다시 찾아뵐 수 있도록 최선을 다하겠습니다.
        </p>
        <p className="text-gray-500 mb-4 mt-2">이용에 불편을 드린 점 깊이 반성하며, 너그러운 양해를 부탁드립니다.</p>
        <LinkButton href="/">홈으로 바로가기</LinkButton>
      </div>
    );
  }

  return (
    <>
      <ProductLayout productType={productType} />

      <ProductCardList productType={productType} data={data.item} />
    </>
  );
}
