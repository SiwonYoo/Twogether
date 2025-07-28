'use client';

import Button from '@/components/common/Button';
import Dialog from '@/components/common/SubDialog';
import { addCart } from '@/data/actions/cart';
import useUserStore from '@/stores/useUserStore';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';

interface ShoppingCartAddProps {
  product_id: number;
  quantity: number;
}

export default function ShoppingCartAdd({ product_id, quantity }: ShoppingCartAddProps) {
  const [isOpen, setOpen] = useState(false);
  const [state, action, isLoading] = useActionState(addCart, null);
  const { user } = useUserStore();

  useEffect(() => {
    if (state?.ok) {
      setOpen(true);
    }
  }, [state]);

  return (
    <>
      <form action={action}>
        <input type="hidden" name="product_id" value={product_id} />
        <input type="hidden" name="quantity" value={quantity} />
        <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />

        <Button
          type="submit"
          disabled={isLoading}
          className="flex justify-center items-center border border-primary text-center w-1/4 px-6 py-2 bg-white"
        >
          <ShoppingBag />
        </Button>
      </form>

      <Dialog isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
