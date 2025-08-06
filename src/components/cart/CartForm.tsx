'use client';

import Button from '@/components/common/Button';
import useCartStore from '@/stores/useCartStore';
import useOrderStore from '@/stores/useOrderStore';
import { useRouter } from 'next/navigation';

export default function CartForm() {
  const { items, checkedIds } = useCartStore();
  const { setOrderItems } = useOrderStore();
  const router = useRouter();

  const orderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedItems = items.filter((item) => checkedIds.includes(item._id));

    const orderItems = selectedItems.map((cartItem) => ({
      ...cartItem.product,
      quantity: cartItem.quantity,
    }));

    setOrderItems(orderItems);

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
