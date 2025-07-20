import type { CartItem } from '@/stores/useCartStore';
import Counter from '@/components/cart/Counter';
import CheckBox from '@/components/common/CheckBox';
import Image from 'next/image';
import { LucideX } from 'lucide-react';
import useCartStore from '@/stores/useCartStore';

interface CartItemCardProps {
  cartItem: CartItem;
  selected?: boolean;
}

export default function CartItemCard({ cartItem, selected = true }: CartItemCardProps) {
  const salePrice = (cartItem.price - cartItem.discount) * cartItem.quantity;

  return (
    <article className="flex flex-col gap-3 px-2 py-3">
      {/* 체크박스, 상품 이미지, 이름 가격, 삭제 버튼 */}
      <div className="flex flex-row h-fit items-start gap-6">
        <CheckBox
          id={`select-cart-item-${cartItem.name}`}
          name="cart-item-select"
          label={`${cartItem.name} 선택 체크박스`}
          hideLabel
          checked={selected}
        />

        <figure className="shrink-0 self-center">
          <Image
            src="/images/products/short-sleeve/01/detail-1.jpg"
            width="80"
            height="108"
            alt="상품 썸네일 이미지"
            className=""
          />
          <figcaption className="sr-only">{cartItem.name} 이미지</figcaption>
        </figure>

        {/* 상품 이름, 정가, 할인 금액 */}
        <div className="flex flex-col justify-center text-xs gap-2 h-[6.75rem] w-full">
          <p>{cartItem.name}</p>
          <p>{cartItem.price}원</p>
          <p className="text-error">-{cartItem.discount}원</p>
        </div>

        {/* 삭제 버튼 */}
        <button type="button" className="cursor-pointer">
          <LucideX size={24} />
        </button>
      </div>

      {/* 옵션, 옵션 변경 */}
      <div className="flex flex-row justify-between bg-secondary-2 text-white px-5 py-4 text-xs">
        <span>[옵션 : {cartItem.option}]</span>
        <a href="#" className="underline underline-offset-2">
          옵션 변경
        </a>
      </div>

      {/* 수량 변경 */}
      <div className="flex flex-row items-center justify-between">
        <span className="">수량</span>
        <Counter quantity={cartItem.quantity} onChange={() => {}} />
      </div>

      <hr className="border-1 border-gray-100" />

      {/* 주문 금액 */}
      <div className="flex flex-row justify-between py-2">
        <span>주문금액</span>
        <span className="font-bold">{salePrice.toLocaleString()}원</span>
      </div>
    </article>
  );
}
