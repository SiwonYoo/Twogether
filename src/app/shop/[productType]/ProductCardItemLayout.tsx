"use client";

import ProductCardItem from "@/components/product/ProductCardItem";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";

interface ProductCardItemLayoutProps {
  productType: string;
  data: Product[];
}

export default function ProductCardItemLayout({ productType, data }: ProductCardItemLayoutProps) {
  const urlLink = useParams();
  const isActive = urlLink.productType === productType;

  // 1productType이 "best"면 isBest 상품만, 아니면 category로 필터
  const filteredData = productType === "best" ? data.filter((item) => item.extra.isBest) : data.filter((item) => item.extra.category === productType);

  return (
    <>
      {isActive && (
        <>
          {filteredData.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
              <ProductCardItem productType={productType} data={filteredData} />
            </ul>
          ) : (
            <div className="font-bold text-center py-8">
              <p className="text-lg">죄송합니다.</p>
              <p className="text-gray-500">현재 등록된 상품이 없습니다.</p>
              <p className="text-gray-500">빠른 시일 내에 준비하여 찾아뵙겠습니다.</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
