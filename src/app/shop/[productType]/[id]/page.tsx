import ProductSelect from '@/app/shop/[productType]/[id]/ProductSelect';
import ImgSlider from '@/components/common/imgSlider';
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
      size: [
        { value: 'FREE', text: 'FREE' },
        { value: 'S', text: 'S' },
        { value: 'M', text: 'M' },
        { value: 'L', text: 'L' },
      ],
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
              <ProductSelect itme={itme} />
            </div>
          );
        })}
      </section>
      {/* 상품 안내 영역 종료 */}
    </>
  );
}
