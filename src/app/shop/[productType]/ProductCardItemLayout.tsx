import LinkButton from '@/components/common/LinkButton';
import ProductCardItem from '@/components/product/ProductCardItem';
import { Product } from '@/types';

interface ProductCardItemLayoutProps {
  productType?: string;
  data: Product[];
}

export default function ProductCardItemLayout({ productType, data }: ProductCardItemLayoutProps) {
  const dataFilter = data.length;
  let title = '';
  switch (productType) {
    case 'shortSleeve':
      title = '짧은 잠옷 상품 중에';
      break;
    case 'longSleeve':
      title = '긴 잠옷 상품 중에';
      break;
    case 'robe':
      title = '로브 상품 중에';
      break;
    case 'acc':
      title = '액세서리 상품 중에';
      break;
    case 'best':
      title = '베스트 상품 중에';
      break;
    case 'sale':
      title = '세일 상품 중에';
      break;
    default:
      title = '';
  }

  return (
    <>
      {dataFilter > 0 ? (
        <ProductCardItem data={data} />
      ) : (
        <div className="font-bold text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4">
          <p className="text-3xl mb-4">고객님, 정말 죄송합니다.</p>
          <p className="text-gray-500">현재 {title} 보여드릴 상품이 없어 불편을 드리게 된 점 진심으로 사과드립니다.</p>
          <p className="text-gray-500 my-2">상품 준비에 차질이 생겨 기다리시게 해 드린 점, 대단히 송구스럽습니다.</p>
          <p className="text-gray-500">
            최대한 빠른 시일 내에 새로운 상품을 갖추어 다시 찾아뵐 수 있도록 최선을 다하겠습니다.
          </p>
          <p className="text-gray-500 mb-4 mt-2">이용에 불편을 드린 점 깊이 반성하며, 너그러운 양해를 부탁드립니다.</p>
          <LinkButton href="/">홈으로 바로가기</LinkButton>
        </div>
      )}
    </>
  );
}
