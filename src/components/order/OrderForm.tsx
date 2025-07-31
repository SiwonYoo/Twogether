'use client';

import { FormEvent, useState } from 'react';
import Button from '@/components/common/Button';
import ShippingDetailsSection from '@/components/order/ShippingDetailsSection';
import OrderListSection from '@/components/order/OrderListSection';
import PriceDetailsSection from '@/components/cart/PriceDetailsSection';
import PaymentOptionSection from '@/components/order/PaymentOptionSection';
import TermsSection from '@/components/order/TermsSection';
import { TermInfo } from '@/components/order/TermsSection';
import useCartStore from '@/stores/useCartStore';
import useUserStore from '@/stores/useUserStore';
import { addOrder } from '@/data/actions/order';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCarts } from '@/data/actions/cart';
import { getCarts } from '@/data/functions/cart';

const ADDRESS_NAME = '집';
const ADDRESS_VALUE = '서울 종로구 종로3길 17 D1동 16층, 17층[03155]';

interface OrderFormProps {
  isDirectlyOrdered?: boolean;
  directlyOrderedProductId?: number;
}

export default function OrderForm({ isDirectlyOrdered = false, directlyOrderedProductId = 0 }: OrderFormProps) {
  // 결제 방법 상태 관리
  const [selectedPayment, setSelectedPayment] = useState<'credit' | 'bank'>('credit');

  // 약관 더미 데이터
  const termInfos: TermInfo[] = [
    {
      title: '전체 동의',
      content: '',
      required: false,
    },
    {
      title: '주문내역 확인 및 결제 동의',
      content: '주문내역 확인 및 결제 동의 내용',
      required: true,
    },
    {
      title: '개인정보 수집 · 이용 동의',
      content: '개인정보 수집 · 이용 동의 내용',
      required: true,
    },
    {
      title: '개인정보 제 3자 정보 제공 동의',
      content: '개인정보 제 3자 정보 제공 동의 내용',
      required: true,
    },
    {
      title: '결제대행 서비스 이용약관 동의',
      content: '결제대행 서비스 이용약관 동의 내용',
      required: true,
    },
    {
      title: '포토폴리오 용으로 결제되지 않습니다',
      content: '포토폴리오 용으로 결제되지 않습니다 내용',
      required: true,
      highlight: true,
    },
  ];

  // 약관 동의 상태 관리 (키-값 쌍)
  const [checkedTerms, setCheckedTerms] = useState<Record<string, boolean>>({});

  // 필수 약관이 모두 동의됐는지 (required가 true인 항목(=필수 동의 약관)들이 checkedTerms에서 모두 true인지 검증!)
  const allRequiredChecked = termInfos.filter((term) => term.required).every((term) => checkedTerms[term.title]);

  const { user } = useUserStore();
  const { items, setItems, checkedIds, setCheckedIds } = useCartStore();

  useEffect(() => {
    // 상품 상세보기 페이지에서 바로 구매하기로 접근했을 때!
    if (!isDirectlyOrdered || directlyOrderedProductId === 0) return;

    async function fetchCarts() {
      try {
        const res = await getCarts(user?.token?.accessToken || '');
        console.log('장바구니 데이터 :', res);

        if (res.ok && res.item) {
          const filtered = res.item.filter((item) => item.product_id === directlyOrderedProductId);
          setItems(filtered);
          setCheckedIds(filtered.map((item) => item._id));
        }
      } catch (err) {
        console.error('장바구니 API 호출 실패', err);
      }
    }

    fetchCarts();
  }, [isDirectlyOrdered, directlyOrderedProductId, user?.token?.accessToken]);

  // items중 체크박스 선택된 놈만
  const selectedItems = items.filter((item) => checkedIds.includes(item._id));

  // api 제출용
  const orderItems = selectedItems.map((item) => ({
    _id: item.product_id,
    quantity: item.quantity,
  }));

  const [state, action, isLoading] = useActionState(addOrder, null);

  const router = useRouter();

  // 주문 성공 / 샐피
  useEffect(() => {
    if (state?.ok) {
      // 주문한 아이템들 전역 상태에서 삭제
      const formData = new FormData();
      formData.set('cartIDs', checkedIds.join(','));
      formData.set('accessToken', user?.token?.accessToken || '');

      deleteCarts(null, formData);

      // 주문 완료 페이지로 이동
      router.replace('/order-complete');
    } else if (state?.ok === 0 && state?.message) {
      alert(`주문 실패: ${state.message}`);
    }
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-6">
      {/* 배송지 정보 */}
      <ShippingDetailsSection name={user?.name} address={user?.address} phone={user?.phone} />

      {/* 주문상품 리스트 */}
      <OrderListSection orderItems={selectedItems} />

      <PriceDetailsSection />

      {/* 결제 방법 (상태 관리) */}
      <PaymentOptionSection selected={selectedPayment} onChange={setSelectedPayment} />

      {/* 약관 동의 */}
      <TermsSection termInfos={termInfos} agreedTerms={checkedTerms} setAgreedTerms={setCheckedTerms} />

      {/* 주문하기 버튼 (submit) */}
      <Button size="lg" type="submit" bg={allRequiredChecked ? 'primary' : 'disabled'} disabled={!allRequiredChecked}>
        주문하기
      </Button>

      <input type="hidden" name="orderItems" value={JSON.stringify(orderItems)} />
      <input type="hidden" name="addressName" value={ADDRESS_NAME} />
      <input type="hidden" name="address" value={user?.address || ADDRESS_VALUE} />
      <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
    </form>
  );
}
