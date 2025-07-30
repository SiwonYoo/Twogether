'use client';

import Button from '@/components/common/Button';
import useCartStore from '@/stores/useCartStore';
import { useRouter } from 'next/navigation';

export default function CartForm() {
  const { items } = useCartStore();
  const router = useRouter();

  const orderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 주문 처리, 폼 제출 들어가야함

    // 화면 전환
    router.push('/order');
  };

  return (
    <form onSubmit={orderSubmit}>
      <Button type="submit" shape="square" bg="light" size="lg">
        선택상품주문
      </Button>
    </form>
  );
}
