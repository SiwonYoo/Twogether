'use client';

import CartListItem from '@/components/cart/CartListItem';
import { Flag, LucideChevronDown, LucideChevronUp } from 'lucide-react';
import { SizeOption } from '@/constants/options';
import CheckBox from '@/components/common/CheckBox';
import useCartStore from '@/stores/useCartStore';
import { useEffect, useState } from 'react';

// 더미 데이터, 실제 데이터는 useCartStore에서 가져오기
const dummyItem = {
  id: '1',
  name: '러블리민트 실크스킨 반팔(더미아이템)',
  price: 56900,
  discount: 34000,
  option: 'FREE' as SizeOption,
  quantity: 2,
};

export default function CartListSection() {
  return (
    <>
      <section>
        <div className="flex flex-row my-4">
          <h2 className="w-full font-bold">장바구니 상품</h2>

          <button
            id="cart-list-toggle"
            aria-label="장바구니 상품 목록 접기"
            aria-expanded="true"
            className="hover:cursor-pointer"
          >
            <LucideChevronUp />
            <span className="sr-only">목록 접기</span>
          </button>
        </div>

        <ul className="flex flex-col px-3 bg-[#ffffff] gap-3">
          <CartListItem key={1} cartItem={dummyItem} selected={true} isLast={false} />
          <CartListItem key={2} cartItem={dummyItem} selected={true} isLast={false} />
          <CartListItem key={3} cartItem={dummyItem} selected={true} isLast={true} />
        </ul>
      </section>

      <section>
        <div className="flex flex-row items-center gap-2 my-4 justify-end">
          <CheckBox id="select-all-cart-items-checkbox" name="-items-select-all" label="전체 선택 체크박스" hideLabel />
          <label id="all-checked-label" className="font-bold">
            전체 선택 (99/99)
          </label>
        </div>
        <div className="flex justify-end">
          <button className="text-secondary-2 text-xs border-1 px-6 py-1.5 cursor-pointer">선택삭제</button>
        </div>
      </section>
    </>
  );
}
