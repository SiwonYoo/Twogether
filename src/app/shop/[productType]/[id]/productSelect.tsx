'use client';

import ProductTypeIdItme from '@/app/shop/[productType]/[id]/ProductTypeIdItme';
import ShoppingCartAdd from '@/app/shop/[productType]/[id]/ShoppingCartAdd';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import LikeButton from '@/components/product/LikeButton';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

interface SelectSizeItemProps {
  value: string;
  text: string;
}

interface SelectSizeProps {
  title: string;
  pries: number;
  sale: number;
  size: SelectSizeItemProps[];
}

interface productSelectProps {
  itme: SelectSizeProps;
}

export default function ProductSelect({ itme }: productSelectProps) {
  const [selectedValue, setSelectedSize] = useState<string>('');

  return (
    <>
      <div className="border my-6 p-4 border-(--color-gray-350)">
        <DropDown
          id="size"
          label="사이즈"
          items={itme.size}
          placeHolder="사이즈를 선택해주세요"
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setSelectedSize(event.target.value);
          }}
        />
      </div>
      <div className=" bg-(--color-gray-250) p-4">
        <ProductTypeIdItme itme={itme} selectedValue={selectedValue} />
        <div className="flex justify-between items-center gap-2">
          <div className="flex justify-center items-center border border-(--color-primary) text-center w-1/4  px-6 py-2 bg-(--color-white) relative">
            <LikeButton />
          </div>
          <ShoppingCartAdd />
          <div className="w-2/3">
            <Link href="/order">
              <Button shape="square" size="lg">
                구매하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
