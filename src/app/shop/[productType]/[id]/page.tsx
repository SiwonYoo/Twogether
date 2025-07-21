import ProductTypeIdItme from '@/app/shop/[productType]/[id]/ProductTypeIdItme';
import ShoppingCartAdd from '@/app/shop/[productType]/[id]/ShoppingCartAdd';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import ImgSlider from '@/components/common/imgSlider';
import LikeButton from '@/components/product/LikeButton';
import { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{
    productType: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { productType, id } = await params;

  return {
    title: `${productType}, ${id} - Twogether`,
    openGraph: {
      title: `${productType}, ${id} - Twogether`,
      description: '코튼캔디 순면 반팔 상하의 세트(남녀공용) 상품을 둘러보세요!',
      url: `/shop/${productType}/${id}`,
    },
  };
}

export default function ProductDetailPage() {
  const data = [
    {
      title: '코튼캔디 순면 반팔 상하의 세트(남녀공용)',
      pries: 12000,
      sale: 9000,
    },
  ];

  return (
    <>
      <ImgSlider />
      {/* 상품 안내 영역 시작 */}
      <section className="my-6">
        {data.map((itme, index) => {
          return (
            <div key={index}>
              <h2 className="text-2xl font-bold">{itme.title}</h2>
              <p className="mt-4 mb-2">{itme.pries}</p>
              <p>{itme.sale}</p>
              <p className="mt-2 mb-4">
                <span>적립금: </span>
                <span>{Math.floor(itme.pries * 0.02)} (2%) </span>
              </p>
              <p>
                <span>배송금: </span>
                <span>3,000원{' (50,000원 이상 구매시 무료 배송)'}</span>
              </p>
              <div className="border my-6 p-4 border-(--color-gray-350)">
                <DropDown
                  id="size"
                  label="사이즈"
                  items={[
                    { value: 'free', text: 'free' },
                    { value: 's', text: 's' },
                    { value: 'M', text: 'M' },
                    { value: 'L', text: 'L' },
                    { value: 'XL', text: 'XL' },
                    { value: 'XXL', text: 'XXL' },
                  ]}
                  placeHolder="사이즈를 선택해주세요"
                />
              </div>
              <div className=" bg-(--color-gray-250) p-4">
                <ProductTypeIdItme itme={itme} />
                <div className="flex justify-between items-center gap-2">
                  <div className="flex justify-center items-center border border-(--color-primary) text-center w-1/4  px-6 py-2 bg-(--color-white)">
                    <LikeButton />
                  </div>
                  <ShoppingCartAdd />
                  <div className="w-2/3">
                    <Button shape="square" size="lg">
                      구매하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      {/* 상품 안내 영역 종료 */}
    </>
  );
}
