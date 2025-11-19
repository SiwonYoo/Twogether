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
        <ProductCardItem data={data} productType={productType} />
      ) : (
        <div className="text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4 text-gray-500">
          <p className="text-xl mb-4 text-black">고객님, 죄송합니다.</p>
          <p>현재 보여드릴 상품이 없습니다.</p>
          <p>최대한 빠른 시일 내에 새로운 상품을 갖추어</p>
          <p className="mb-5">다시 찾아뵐 수 있도록 최선을 다하겠습니다.</p>
          <LinkButton href="/" lang="eng">
            HOME
          </LinkButton>
        </div>
      )}
    </>
  );
}
