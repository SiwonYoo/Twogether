'use client';

import { FormEvent, useState } from 'react';
import Button from '@/components/common/Button';
import ShippingDetailsSection from '@/components/order/ShippingDetailsSection';
import OrderListSection from '@/components/order/OrderListSection';
import PaymentOptionSection from '@/components/order/PaymentOptionSection';
import TermsSection from '@/components/order/TermsSection';
import { TermInfo } from '@/components/order/TermsSection';

interface CartFormProps {
  shippingData: {
    name: string;
    address: string;
    phone: string;
  };
}

export default function OrderForm({ shippingData }: CartFormProps) {
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

  const submitOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!allRequiredChecked) {
      return;
    }
  };

  return (
    <form onSubmit={submitOrder} className="flex flex-col gap-6">
      {/* 배송지 정보 */}
      <ShippingDetailsSection shippingData={shippingData} />

      {/* 주문상품 리스트 */}
      <OrderListSection />

      {/* 결제 방법 (상태 관리) */}
      <PaymentOptionSection selected={selectedPayment} onChange={setSelectedPayment} />

      {/* 약관 동의 */}
      <TermsSection termInfos={termInfos} agreedTerms={checkedTerms} setAgreedTerms={setCheckedTerms} />

      {/* 주문하기 버튼 (submit) */}
      <Button size="lg" type="submit">
        주문하기
      </Button>
    </form>
  );
}
