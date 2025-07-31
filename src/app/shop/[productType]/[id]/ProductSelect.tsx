'use client';

import ProductTypeIdItem from '@/app/shop/[productType]/[id]/ProductTypeIdItem';
import ShoppingCartAdd from '@/app/shop/[productType]/[id]/ShoppingCartAdd';
import DropDown from '@/components/common/DropDown';
import LikeButton from '@/components/product/LikeButton';
import { Product } from '@/types/product';
import { ChangeEvent, useActionState, useState } from 'react';
import Button from '@/components/common/Button';
import { addCart } from '@/data/actions/cart';
import useUserStore from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProductSelectProps {
  item: Product;
}

export default function ProductSelect({ item }: ProductSelectProps) {
  const [selectedValue, setSelectedSize] = useState<string>('');
  const [state, action, isLoading] = useActionState(addCart, null);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (state?.ok === 1) {
      router.push(`/order?direct=true&product_id=${item._id}`);
    }
  }, [state, router]);

  return (
    <>
      <div className="border my-6 p-4 border-(--color-gray-350)">
        <DropDown
          id="size"
          label="사이즈"
          items={item.extra.size}
          placeHolder="사이즈를 선택해주세요"
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setSelectedSize(event.target.value);
          }}
        />
      </div>
      <div className=" bg-(--color-gray-250) p-4">
        <ProductTypeIdItem item={item} selectedValue={selectedValue} />
        <div className="flex justify-between items-center gap-2">
          <div className="flex justify-center items-center border border-(--color-primary) text-center w-1/4  px-6 py-2 bg-(--color-white) relative">
            <LikeButton data={item} id={item._id} />
          </div>
          <ShoppingCartAdd product_id={item._id} quantity={item.quantity} />
          <div className="w-2/3">
            <form action={action}>
              <Button
                type="submit"
                shape="square"
                size="lg"
                bg={selectedValue !== '' ? 'primary' : 'disabled'}
                disabled={isLoading}
              >
                {selectedValue !== '' ? '구매하기' : '사이즈를 선택해주세요'}
              </Button>

              <input type="hidden" name="product_id" value={item._id} />
              <input type="hidden" name="quantity" value={item.quantity} />
              <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
              {/* <input type="hidden" name="size" value={}/> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
