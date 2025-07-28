'use client';

import { Cart } from '@/types/cart';
import Counter from '@/components/cart/Counter';
import CheckBox from '@/components/common/CheckBox';
import Image from 'next/image';
import { LucideX } from 'lucide-react';
import useCartStore from '@/stores/useCartStore';
import { modifyQuantity, deleteOneCart } from '@/data/actions/cart';
import { useActionState } from 'react';
import { useRef, useEffect } from 'react';
import useUserStore from '@/stores/useUserStore';

interface CartItemCardProps {
  cartItem: Cart;
  selected?: boolean;
  onCheckBoxChange?: (checked: boolean) => void;
  onDelete?: (key: string) => void;
}

export default function CartItemCard({ cartItem, selected = true, onCheckBoxChange, onDelete }: CartItemCardProps) {
  const { user } = useUserStore();
  const { updateQuantity, deleteItem } = useCartStore();

  const salePrice = (cartItem.product.price - 0) * cartItem.quantity;

  const quantityFormRef = useRef<HTMLFormElement>(null);
  const deleteFormRef = useRef<HTMLFormElement>(null);

  const [quantityState, quantityAction, quantityLoading] = useActionState(modifyQuantity, null);
  const [deleteState, deleteAction, deleteLoading] = useActionState(deleteOneCart, null);

  // Counter 수량 변경 시 호출
  const handleCounterChange = (newQuantity: number) => {
    updateQuantity(cartItem.product_id, cartItem.product.extra.size[0].text, newQuantity);

    // 서버 액션
    if (quantityFormRef.current) {
      const qtyInput = quantityFormRef.current.querySelector<HTMLInputElement>('input[name="nextQuantity"]');
      if (qtyInput) qtyInput.value = String(newQuantity);
      quantityFormRef.current.requestSubmit();
    }
  };

  // 삭제 버튼 클릭 시
  const handleDelete = () => {
    // 로컬 스토어 즉시 삭제
    deleteItem(cartItem.product_id, cartItem.product.extra.size[0].text);

    // 부모 컴포넌트가 등록한 함수 호출
    const key = cartItem._id.toString();
    onDelete?.(key);

    // 서버 액션
    deleteFormRef.current?.requestSubmit();
  };

  return (
    <article className="flex flex-col gap-3 px-2 py-3">
      {/* 체크박스, 상품 이미지, 이름, 삭제 버튼 */}
      <div className="flex flex-row h-fit items-start gap-6">
        <CheckBox
          id={`select-cart-item-${cartItem.product.name}`}
          name="cart-item-select"
          label={`${cartItem.product.name} 선택 체크박스`}
          hideLabel
          checked={selected}
          onChange={(e) => onCheckBoxChange?.(e.target.checked)}
        />

        <figure className="shrink-0 self-center">
          <Image src="/images/products/short-sleeve/01/detail-1.jpg" width="80" height="108" alt="상품 썸네일 이미지" />
          <figcaption className="sr-only">{cartItem.product.name} 이미지</figcaption>
        </figure>

        <div className="flex flex-col justify-center text-xs gap-2 h-[6.75rem] w-full">
          <p>{cartItem.product.name}</p>
          <p>{cartItem.product.price.toLocaleString()}원</p>
          <p className="text-error">-{(0).toLocaleString()}원</p>
        </div>

        {/* 삭제 버튼 폼 */}
        <form ref={deleteFormRef} action={deleteAction}>
          <input type="hidden" name="cartID" value={cartItem._id} />
          <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
          <button type="button" disabled={deleteLoading} className="cursor-pointer" onClick={handleDelete}>
            <LucideX size={24} />
          </button>
        </form>
      </div>

      {/* 옵션 표시 */}
      <div className="flex flex-row justify-between bg-secondary-2 text-white px-5 py-4 text-xs">
        <span>[옵션 : {cartItem.product.extra.size[0].text}]</span>
        <a href="#" className="underline underline-offset-2">
          옵션 변경
        </a>
      </div>

      {/* 수량 변경 폼 */}
      <form ref={quantityFormRef} action={quantityAction} className="flex flex-row items-center justify-between">
        <span className="">수량</span>
        <Counter quantity={cartItem.quantity} onChange={handleCounterChange} />
        <input type="hidden" name="nextQuantity" value={cartItem.quantity} />
        <input type="hidden" name="cartID" value={cartItem._id} />
        <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
        <button type="submit" className="hidden" disabled={quantityLoading}>
          수량 반영
        </button>
      </form>

      <hr className="border-1 border-gray-100" />

      {/* 주문 금액 */}
      <div className="flex flex-row justify-between py-2">
        <span>주문금액</span>
        <span className="font-bold">{salePrice.toLocaleString()}원</span>
      </div>
    </article>
  );
}
