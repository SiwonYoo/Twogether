'use client';

import { useState, useEffect, useRef } from 'react';
import { LucideSearch } from 'lucide-react';

interface ShippingDetailsSectionProps {
  name?: string;
  address?: string;
  phone?: string;
}

export default function ShippingDetailsSection({
  name = '김멋사',
  address = '서울 종로구 종로3길 17 D1동 16층, 17층[03155]',
  phone = '010-1234-5678',
}: ShippingDetailsSectionProps) {
  const [selectedAddress, setSelectedAddress] = useState(address);
  const [detailAddress, setDetailAddress] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSearchAddress = () => {
    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        const fullAddress = data.address;
        setSelectedAddress(fullAddress);
      },
    }).open();
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg">배송지</h2>

      <article className="flex flex-col gap-1 shadow rounded-2xl bg-[#ffffff] px-3 py-4">
        <div className="flex flex-row gap-3">
          <p>{name}</p>
          <p>{phone}</p>
        </div>

        <div className="flex flex-row justify-between items-center">
          <p>{selectedAddress}</p>
          <button type="button" onClick={handleSearchAddress}>
            <LucideSearch className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mt-0">
          <input
            type="text"
            id="detailAddress"
            placeholder="상세 주소를 입력해주세요"
            className="w-full px-2 py-1 border rounded-md border-gray-250"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <p className="mb-1">배송 메모를 입력해주세요</p>
          <input
            type="text"
            name="shippingMemo"
            placeholder="배송 메모를 입력해주세요"
            className="w-full px-2 py-1 border rounded-md border-gray-250"
          />
        </div>

        <input type="hidden" name="address" value={`${selectedAddress}, ${detailAddress}`} />
      </article>
    </section>
  );
}
