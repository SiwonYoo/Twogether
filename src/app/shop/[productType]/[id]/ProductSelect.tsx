'use client';

import ProductTypeIdItem from '@/app/shop/[productType]/[id]/ProductTypeIdItem';
import ShoppingCartAdd from '@/app/shop/[productType]/[id]/ShoppingCartAdd';
import DropDown from '@/components/common/DropDown';
import LinkButton from '@/components/common/LinkButton';
import LikeButton from '@/components/product/LikeButton';
import { Product } from '@/types/product';
import { ChangeEvent, useState } from 'react';

interface ProductSelectProps {
  item: Product;
}

export default function ProductSelect({ item }: ProductSelectProps) {
  const [selectedValue, setSelectedSize] = useState<string>('');
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
            <LikeButton />
          </div>
          <ShoppingCartAdd product_id={item._id} quantity={item.quantity} />
          <div className="w-2/3">
            <LinkButton
              href={selectedValue !== '' ? '/order' : ''}
              shape="square"
              size="lg"
              bg={selectedValue !== '' ? 'primary' : 'disabled'}
              onClick={() => (selectedValue !== '' ? '' : alert('사이즈를 선택해주세요'))}
            >
              {selectedValue !== '' ? '구매하기' : '사이즈를 선택해주세요'}
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
