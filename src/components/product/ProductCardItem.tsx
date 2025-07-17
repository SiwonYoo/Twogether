import ImgSlider from '@/app/imgSlider';
import LikeButton from '@/components/product/LikeButton';
import Link from 'next/link';

interface ProductCardProps {
  productTitle: string;
  price: number;
  keys?: number;
}

/**
 * 제품 카드 컨포넌트입니다. api에서 데이터를 받아와 생성됩니다.
 * @param param0 - 제품의 이름과 가격을 담든 매개변수 입니다.
 * @returns
 */
export default function ProductCardItem({ productTitle, price, keys }: ProductCardProps) {
  return (
    <>
      <li key={keys}>
        <ImgSlider />
        <div className="flex justify-between mt-4">
          <div className="text-left">
            <Link href="/">
              <h3 className="font-bold">{productTitle}</h3>
            </Link>
            <p className="text-[.75rem]">{price}</p>
          </div>
          <LikeButton />
        </div>
      </li>
    </>
  );
}
