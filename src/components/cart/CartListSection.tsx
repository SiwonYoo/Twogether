'use client';

import CartListItem from '@/components/cart/CartListItem';
import { LucideChevronDown, LucideChevronUp } from 'lucide-react';
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

// CartStore 전역 상태에 등록할 더미 카트 데이터
const dummyCart = {
  items: [
    { ...dummyItem },
    { ...dummyItem, option: 'M' as SizeOption, quantity: 40 },
    { ...dummyItem, option: 'L' as SizeOption, quantity: 70 },
  ],
};

export default function CartListSection() {
  // 장바구니 전역 상태관리
  const { items, addItem, deleteItem } = useCartStore();
  // 장바구니 접기 / 열기 상태관리
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // 개별 체크박스 상태관리
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    // 전역 상태에 더미 데이터 임시로 add
    dummyCart.items.forEach((item) => {
      addItem(item);
    });

    // 처음엔 모든 체크박스 선택되게 초기화
    setCheckedIds(dummyCart.items.map((item) => `${item.id}-${item.option}`));
  }, []);

  const toggleCardListSectionFolding = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleAllCheckBox = (checked: boolean) => {
    if (checked) {
      setCheckedIds(items.map((item) => `${item.id}-${item.option}`));
    } else {
      setCheckedIds([]);
    }
  };

  const deleteSelectedItems = () => {
    for (let i = 0; i < checkedIds.length; i++) {
      const key = checkedIds[i];
      const [id, optionStr] = key.split('-');
      const option = optionStr as SizeOption;

      deleteItem(id, option);
      setCheckedIds([]);
    }
  };

  // 개별 체크박스 선택시 호출될 콜백함수. CheckBox 컴포넌트에서 사용
  const toggleCardCheckBox = (id: string, checked: boolean) => {
    setCheckedIds((prev) => (checked ? [...prev, id] : prev.filter((cid) => cid !== id)));
  };

  const isAllChecked = checkedIds.length === items.length;

  return (
    <>
      <section>
        <div className="flex flex-row my-4">
          <h2 className="w-full font-bold">장바구니 상품</h2>

          <button
            id="cart-list-toggle"
            aria-label="장바구니 상품 목록 접기"
            aria-expanded="true"
            onClick={toggleCardListSectionFolding}
            className="hover:cursor-pointer"
          >
            {isOpen ? <LucideChevronUp /> : <LucideChevronDown />}
            <span className="sr-only">목록 접기</span>
          </button>
        </div>

        <ul className={`flex flex-col px-3 bg-[#ffffff] gap-3 ${isOpen ? '' : 'hidden'}`}>
          {/* 전역상태의 items(장바구니 리스트)를 바탕으로 장바구니 카드 동적 생성 */}
          {items.map((item, index) => (
            <CartListItem
              key={`${item.id}-${item.option}`}
              cartItem={item}
              selected={checkedIds.includes(`${item.id}-${item.option}`)}
              onCheckBoxChange={(checked) => toggleCardCheckBox(`${item.id}-${item.option}`, checked)}
              isLast={index === items.length - 1}
            />
          ))}
        </ul>
      </section>

      <section className={`${isOpen ? '' : 'hidden'}`}>
        <div className="flex flex-row items-center gap-2 my-4 justify-end">
          <CheckBox
            id="select-all-cart-items-checkbox"
            name="-items-select-all"
            label="전체 선택 체크박스"
            hideLabel
            checked={isAllChecked}
            onChange={toggleAllCheckBox}
          />
          <label id="all-checked-label" className="font-bold">
            전체 선택 ({checkedIds.length}/{items.length})
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="text-secondary-2 text-xs border-1 px-6 py-1.5 cursor-pointer"
            onClick={deleteSelectedItems}
          >
            선택삭제
          </button>
        </div>
      </section>
    </>
  );
}
