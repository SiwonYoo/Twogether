'use client';

import Button from '@/components/common/Button';
import SubDialog from '@/components/common/SubDialog';
import { addCart } from '@/data/actions/cart';
import useUserStore from '@/stores/useUserStore';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { getCarts } from '@/data/functions/cart';
import useCartStore from '@/stores/useCartStore';

interface ShoppingCartAddProps {
  product_id: number;
  quantity: number;
}

export default function ShoppingCartAdd({ product_id, quantity }: ShoppingCartAddProps) {
  const [isOpen, setOpen] = useState(false);
  const [state, action, isLoading] = useActionState(addCart, null);
  const { user } = useUserStore();
  const { setItems, setCheckedIds } = useCartStore();

  useEffect(() => {
    if (state?.ok) {
      const userLocalStorage = localStorage.getItem('user');
      let accessToken = '';

      if (userLocalStorage) {
        try {
          const parsed = JSON.parse(userLocalStorage);
          accessToken = parsed?.state?.user?.token?.accessToken;
        } catch (err) {
          console.error('액세스 토큰 파싱 실패', err);
        }
      }

      // 장바구니 API에서 목록 조회 후 장바구니 전역 상태에 set
      async function fetchCarts() {
        if (!accessToken) return;

        try {
          const res = await getCarts(accessToken);

          if (res.ok && res.item) {
            setItems(res.item);
            setCheckedIds(res.item.map((item) => item._id));
          }
        } catch (err) {
          console.error('장바구니 API 호출 실패', err);
        }
      }

      fetchCarts();

      setOpen(true);
    }
  }, [state]);

  return (
    <>
      <form action={action} className="block w-1/4">
        <input type="hidden" name="product_id" value={product_id} />
        <input type="hidden" name="quantity" value={quantity} />
        <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />

        <Button
          type="submit"
          disabled={isLoading}
          className="flex justify-center items-center border border-primary text-center w-full px-6 py-2 bg-white"
        >
          <ShoppingBag />
        </Button>
      </form>

      <SubDialog isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
