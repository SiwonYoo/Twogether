import Image from 'next/image';
import { Cart } from '@/types/cart';
import { Product } from '@/types';

interface OrderItemCardProps {
  orderItem: Product;
}

export default function OrderItemCard({ orderItem }: OrderItemCardProps) {
  return (
    <article className="flex flex-row px-2 py-3 gap-4 bg-[#ffffff] rounded-lg shadow">
      <Image src={orderItem.mainImages[0].path} width="80" height="108" alt="상품 썸네일 이미지" className="" />
      <div className="flex flex-col w-full justify-between">
        <p>{orderItem.name}</p>
        <div>
          <div className="flex flex-row">
            <p className="grow">상품 수량</p>
            <p className=" text-gray-550">{orderItem.quantity}개</p>
          </div>
          <div className="flex flex-row">
            <p className="grow">개당 금액</p>
            <p className="mr-4 line-through text-gray-550">{orderItem.price.toLocaleString()}원</p>
            <p className="text-error">{orderItem.extra.salePrice?.toLocaleString()}원</p>
          </div>
        </div>
      </div>
    </article>
  );
}
