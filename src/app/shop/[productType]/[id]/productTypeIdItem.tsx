'use client';

import { X } from 'lucide-react';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import { useState } from 'react';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

interface SizeType {
  value: string;
  text: string;
}

interface ItemType {
  title: string;
  pries: number;
  sale: number;
  size: SizeType[];
}

interface ProductTypeIdItmeProps {
  itme: ItemType;
  selectedValue: string;
}

// 상품 계산 컨포넌트
export default function ProductTypeIdItem({ itme, selectedValue }: ProductTypeIdItmeProps) {
  const [priseDate, setPriseDate] = useState(1);

  const addDate = () => {
    setPriseDate(priseDate + 1);
  };

  const minusDate = () => {
    if (priseDate === 0) {
      // 상품 갯수가 0이면 동작하지 않음
      return;
    } else {
      setPriseDate(priseDate - 1);
    }
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="mb-2">{itme.title}</h3>
          <p aria-label={`선택된`}>사이즈: {selectedValue === '' ? '사이즈를 선택해주세요' : selectedValue}</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-between items-center">
            <button className="border border-(--color-gray-350) p-1 w-8 h-8 text-center" onClick={minusDate}>
              -
            </button>
            <p className="border border-(--color-gray-350) p-1 w-8 h-8 text-center">{priseDate}</p>
            <button className="border border-(--color-gray-350) p-1 w-8 h-8 text-center" onClick={addDate}>
              +
            </button>
          </div>
          <p>
            <X />
          </p>
        </div>
      </div>
      <div className="flex justify-between my-4">
        <p className={`${JudsonFont.className}`}>TOTAL</p>
        <div>
          <span className="text-2xl font-bold">{itme.sale * priseDate}</span>
          <span className="text-(--color-gray-350)"> ({priseDate}개)</span>
        </div>
      </div>
    </>
  );
}
