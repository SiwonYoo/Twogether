'use client';

import CartListItem from '@/components/cart/CartListItem';
import { LucideChevronDown, LucideChevronUp } from 'lucide-react';
import CheckBox from '@/components/common/CheckBox';
import useCartStore from '@/stores/useCartStore';
import { useRef, useEffect, useState } from 'react';
import { getCarts } from '@/data/functions/cart';
import useUserStore from '@/stores/useUserStore';
import { useActionState } from 'react';
import { deleteCarts } from '@/data/actions/cart';

export default function CartListSection() {
  // 장바구니 전역 상태관리
  const { items, setItems, deleteItemByCartId, checkedIds, setCheckedIds } = useCartStore();
  // 장바구니 접기 / 열기 상태관리
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { user } = useUserStore();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user');
    let accessToken = '';

    if (userLocalStorage) {
      try {
        const parsed = JSON.parse(userLocalStorage);
        accessToken = parsed?.state?.user?.token?.accessToken;
        console.log('액세스 토큰 :', accessToken);
      } catch (err) {
        console.error('액세스 토큰 파싱 실패', err);
      }
    }

    // 장바구니 API에서 목록 조회 후 장바구니 전역 상태에 set
    async function fetchCarts() {
      if (!accessToken) return;

      try {
        const res = await getCarts(accessToken);
        console.log('장바구니 데이터 :', res);

        if (res.ok && res.item) {
          setItems(res.item);
          setCheckedIds(res.item.map((item) => item._id));
        }
      } catch (err) {
        console.error('장바구니 API 호출 실패', err);
      }
    }

    fetchCarts();
  }, []);

  useEffect(() => {
    console.log('현재 checkedIds:', checkedIds);
  }, [checkedIds]);

  /**
   * 장바구니 리스트 접기/펼치기
   */
  const toggleCardListSectionFolding = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   * 전체 선택 체크박스
   */
  const toggleAllCheckBox = (checked: boolean) => {
    if (checked) {
      setCheckedIds(items.map((item) => item._id));
    } else {
      setCheckedIds([]);
    }
  };

  // 개별 체크박스 선택시 호출될 콜백함수. CheckBox 컴포넌트에서 사용
  const toggleCardCheckBox = (id: number, checked: boolean) => {
    const safeCheckedIds = Array.isArray(checkedIds) ? checkedIds : [];

    if (checked) {
      setCheckedIds([...safeCheckedIds, id]);
    } else {
      setCheckedIds(safeCheckedIds.filter((cid) => cid !== id));
    }
  };

  const isAllChecked = checkedIds.length === items.length;

  const deleteFormRef = useRef<HTMLFormElement>(null);
  const [deleteState, deleteAction, deleteLoading] = useActionState(deleteCarts, null);

  const handleSelectedDelete = () => {
    const idsToDelete = [...checkedIds];

    idsToDelete.forEach((key) => {
      deleteItemByCartId(Number(key));
    });

    setCheckedIds([]);

    // 서버 액션
    deleteFormRef.current?.requestSubmit();
  };

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
              key={`${item.product_id}-${item.product.extra.size[0].text}`}
              cartItem={item}
              selected={checkedIds.includes(item._id)}
              onCheckBoxChange={(checked) => toggleCardCheckBox(item._id, checked)}
              onDelete={(key) => {
                const safeChecked = Array.isArray(checkedIds) ? checkedIds : [];
                setCheckedIds(safeChecked.filter((id) => id !== Number(key)));
              }}
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
            onChange={(e) => toggleAllCheckBox(e.target.checked)}
          />
          <label id="all-checked-label" className="font-bold">
            전체 선택 ({checkedIds.length}/{items.length})
          </label>
        </div>
        <div className="flex justify-end">
          <form ref={deleteFormRef} action={deleteAction}>
            <input type="hidden" name="cartIDs" value={checkedIds.join(',')} />
            <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
            <button
              type="button"
              className="text-secondary-2 text-xs border-1 px-6 py-1.5 cursor-pointer"
              onClick={handleSelectedDelete}
            >
              선택삭제
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
