import { LucideSearch } from 'lucide-react';

interface ShippingDetailsSectionProps {
  shippingData: {
    name: string;
    address: string;
    phone: string;
  };
}

export default function ShippingDetailsSection({ shippingData }: ShippingDetailsSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg">배송지</h2>

      <article className="flex flex-col gap-1 shadow rounded-2xl bg-[#ffffff] px-3 py-4">
        <div className="flex flex-row gap-3">
          <p>김멋사</p>
          <p>010-1234-5678</p>
        </div>
        <div className="flex flex-row justify-between mb-6">
          <p>서울 종로구 종로3길 17 D1동 16층, 17층[03155]</p>
          <LucideSearch />
        </div>
        <div>
          <p className="mb-1">배송 메모를 입력해주세요</p>
          <input
            type="text"
            name="shippingMemo"
            placeholder="배송 메모를 입력해주세요"
            className="w-full px-2 py-1 border rounded-md border-gray-250"
          />
        </div>
      </article>
    </section>
  );
}
