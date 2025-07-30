import Image from 'next/image';
import { Cart } from '@/types/cart';

interface OrderItemCardProps {
  cartItem: Cart;
}

export default function OrderItemCard({ cartItem }: OrderItemCardProps) {
  return (
    <article className="flex flex-row px-2 py-3 gap-4 bg-[#ffffff] rounded-lg shadow">
      <Image
        src="/images/products/short-sleeve/01/detail-1.jpg" // 추후 변경
        width="80"
        height="108"
        alt="상품 썸네일 이미지"
        className=""
      />
      <div className="flex flex-col w-full justify-between">
        <p>{cartItem.product.name}</p>
        <div>
          <div className="flex flex-row">
            <p className="grow">상품 수량</p>
            <p className=" text-gray-550">{cartItem.quantity}개</p>
          </div>
          <div className="flex flex-row">
            <p className="grow">개당 금액</p>
            <p className="mr-4 line-through text-gray-550">{cartItem.product.price.toLocaleString()}원</p>
            <p className="text-error">{cartItem.product.price.toLocaleString()}원</p>
          </div>
        </div>
      </div>
    </article>
  );
}
