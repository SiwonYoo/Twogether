'use client';

import useCartStore from '@/stores/useCartStore';
import useOrderStore from '@/stores/useOrderStore';
import { Product, Cart } from '@/types';
import { calculateTotalPrice, calculateDeliveryFee, calculateTotalDiscount, calculateFinalAmount } from '@/utils/cart';

interface PriceDetailsSectionProps {
  where: 'cart' | 'order';
}

export default function PriceDetailsSection({ where }: PriceDetailsSectionProps) {
  const { items, checkedIds } = useCartStore();
  const { orderItems } = useOrderStore();

  if (where === 'cart') {
    const data = items.filter((item) => checkedIds.includes(item._id)) as Cart[];

    return (
      <section className="flex flex-col gap-3 p-4 border-1 mb-4">
        <div className="flex flex-row justify-between">
          <p>총 상품금액</p>
          <p>{calculateTotalPrice<Cart>(data).toLocaleString()}원</p>
        </div>

        <div className="flex flex-row justify-between">
          <p>총 할인금액</p>
          <p>{calculateTotalDiscount<Cart>(data).toLocaleString()}원</p>
        </div>

        <div className="flex flex-row justify-between">
          <p>배송비</p>
          <p>{calculateDeliveryFee<Cart>(data).toLocaleString()}원</p>
        </div>

        <hr className="border-gray-250" />

        <div className="flex flex-row justify-between font-bold">
          <p className="">결제예정금액</p>
          <p>{calculateFinalAmount<Cart>(data).toLocaleString()}원</p>
        </div>
      </section>
    );
  } else {
    const data = orderItems as Product[];

    return (
      <section className="flex flex-col gap-3 p-4 border-1 mb-4">
        <div className="flex flex-row justify-between">
          <p>총 상품금액</p>
          <p>{calculateTotalPrice<Product>(data).toLocaleString()}원</p>
        </div>

        <div className="flex flex-row justify-between">
          <p>총 할인금액</p>
          <p>{calculateTotalDiscount<Product>(data).toLocaleString()}원</p>
        </div>

        <div className="flex flex-row justify-between">
          <p>배송비</p>
          <p>{calculateDeliveryFee<Product>(data).toLocaleString()}원</p>
        </div>

        <hr className="border-gray-250" />

        <div className="flex flex-row justify-between font-bold">
          <p className="">결제예정금액</p>
          <p>{calculateFinalAmount<Product>(data).toLocaleString()}원</p>
        </div>
      </section>
    );
  }
}
