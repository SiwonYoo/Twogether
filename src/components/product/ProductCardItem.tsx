import ImagesSwiper from '@/components/product/ImagesSwiper';
import LikeButton from '@/components/product/LikeButton';
import { Product } from '@/types';
import Link from 'next/link';

interface ProductCardItemProps {
  productType: string;
  Itemid?: number;
  data: Product[];
}

/**
 * 개별 상품 카드를 렌더링하는 컴포넌트입니다.
 *
 * - 상품 이미지, 이름, 가격, 찜 버튼 등의 UI를 포함합니다.
 * - 상품 목록을 받아 각각의 상품 카드 형태로 리스트를 구성합니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.productType - 상품의 카테고리 (예: "acc", "longSleeve" 등)
 * @param {number} [props.Itemid] - 찜 삭제 기능에서 사용할 상품 ID (선택적)
 * @param {Product[]} props.data - 렌더링할 상품 리스트 데이터 배열
 *
 * @returns {JSX.Element} 상품 목록 UI를 포함한 JSX 엘리먼트
 */

export default function ProductCardItem({ productType, Itemid, data }: ProductCardItemProps) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <li key={index}>
            <Link href={`/shop/${productType}/${item._id}`} className="block h-[15.625rem]">
              <ImagesSwiper data={data} height={'15.625rem'} />
            </Link>
            <div className="flex justify-between mt-4">
              <Link href={`/shop/${productType}/${item._id}`}>
                <div className="text-left">
                  <h3 className="font-bold">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-[.75rem] ${
                        item.extra.isSale
                          ? 'text-(--color-gray-450) line-through decoration-2 decoration-(--color-error)'
                          : ''
                      }`}
                    >
                      {item.price}
                    </p>
                    <p className="text-[.75rem]">{item.extra.isSale ? item.extra.salePrice : ''}</p>
                  </div>
                </div>
              </Link>
              <LikeButton data={item} id={Number(item._id)} Itemid={Number(Itemid)} />
            </div>
          </li>
        );
      })}
    </>
  );
}
