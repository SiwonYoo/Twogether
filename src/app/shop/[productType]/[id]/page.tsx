import ProductSelect from '@/app/shop/[productType]/[id]/ProductSelect';
import ProductTabs from '@/app/shop/[productType]/[id]/ProductTabs';
import ShareBtn from '@/app/shop/[productType]/[id]/ShareBtn';
import ImgSlider from '@/components/common/imgSlider';
import LinkButton from '@/components/common/LinkButton';
import { getProduct } from '@/data/functions/shop';
import { Metadata } from 'next';

interface ProductCardItemProps {
  params: Promise<{
    productType: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductCardItemProps): Promise<Metadata> {
  const { productType, id } = await params;
  const customQuery = encodeURIComponent(
    JSON.stringify({
      _id: id,
      'extra.category': productType,
    })
  );
  const data = await getProduct(customQuery);

  // 타입체크
  if (data.ok === 0) {
    return {};
  }
  const product = data.item.find((p) => p._id === Number(id));
  return {
    title: `${product?.name}`,
    description: `스타일리시한 ${productType}, 지금 Twogether에서 확인해보세요.`,
    openGraph: {
      title: `${product?.name} - Twogether`,
      description: `스타일리시한 ${productType}, 지금 Twogether에서 확인해보세요.`,
      url: `/shop/${productType}`,
    },
  };
}

export default async function ProductDetilPage({ params }: ProductCardItemProps) {
  const { productType, id } = await params;

  const customQuery = encodeURIComponent(
    JSON.stringify({
      'extra.category': productType,
      _id: id,
    })
  );
  const data = await getProduct(customQuery);

  if (data.ok === 0) {
    return (
      <div className="font-bold text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4">
        <p className="text-3xl mb-4">고객님, 진심으로 사과드립니다.</p>
        <p className="text-gray-500">서버 문제로 인해 상품 정보 제공에 차질이 발생했습니다.</p>
        <p className="text-gray-500 my-2">이로 인해 오랜 시간 기다리시게 된 점 깊이 죄송합니다.</p>
        <p className="text-gray-500">빠른 시일 내에 정상화된 상품을 갖추어 찾아뵐 수 있도록 최선을 다하겠습니다.</p>
        <p className="text-gray-500 mb-4 mt-2">불편을 드린 점 다시 한번 사과드리며, 너그러운 양해 부탁드립니다.</p>

        <LinkButton href="/">홈으로 바로가기</LinkButton>
      </div>
    );
  }

  const product = data.item.find((p) => p._id === Number(id));

  if (!product) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <>
      {/* 이미지 슬라이드 */}
      <div className="h-[650px] overflow-hidden relative">
        <ImgSlider data={product} />
        <ShareBtn />
      </div>
      {/* 서버통신이 성공이면 나오는 메시지 */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className={`mt-4 mb-2 ${product.extra.isSale ? '' : 'text-2xl font-bold'}`}>
          {product.extra.isSale ? (
            <span className="text-(--color-gray-450) line-through decoration-2 decoration-(--color-error)">
              {product.price} 원
            </span>
          ) : (
            `${product.price} 원`
          )}{' '}
        </p>
        <p className="font-bold text-2xl">{product.extra.isSale ? `${product.extra.salePrice} 원` : ''}</p>
        <p className="mt-2 mb-4">
          <span>적립금: </span>
          <span>
            {Math.floor(Number(product.price) * 0.02)} {'(2%)'}
          </span>
        </p>
        <p>
          <span>배송금: </span>
          <span>
            {product.shippingFees}원{' (50,000원 이상 구매시 무료 배송)'}
          </span>
        </p>

        {/* 사이즈, 수량 선택 컨포넌트 */}
        <ProductSelect item={product} />

        {/* 상품 페이지 디테일 */}
        <ProductTabs productType={productType} product={product} />
      </div>
    </>
  );
}
