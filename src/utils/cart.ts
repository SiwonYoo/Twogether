import { BASIC_DELIVERY_FEE, DELIVERY_FREE_MIN_PRICE } from '@/constants/money';
import { Product } from '@/types';
import { Cart } from '@/types/cart';

/**
 * Cart | Product 모두에서 가격과 수량을 가져오는 헬퍼
 */
function getPriceAndQuantity(item: Cart | Product) {
  if ('product' in item) {
    // Cart 타입
    return { price: item.product.price, salePrice: item.product.extra.salePrice, quantity: item.quantity };
  }
  // Product 타입
  return { price: item.price, salePrice: item.extra.salePrice, quantity: item.quantity };
}

/**
 * 총 상품금액
 */
export function calculateTotalPrice<T extends Cart | Product>(items: T[]): number {
  return (items ?? []).reduce((sum, item) => {
    const { price, quantity } = getPriceAndQuantity(item);
    return sum + price * quantity;
  }, 0);
}

/**
 * 총 할인금액
 */
export function calculateTotalDiscount<T extends Cart | Product>(items: T[]): number {
  return (items ?? []).reduce((sum, item) => {
    const { price, salePrice, quantity } = getPriceAndQuantity(item);
    return sum + (price - (salePrice ?? price)) * quantity;
  }, 0);
}

/**
 * 결제 예정 금액
 */
export function calculateFinalAmount<T extends Cart | Product>(items: T[]): number {
  return calculateTotalPrice(items) - calculateTotalDiscount(items) + calculateDeliveryFee(items);
}

/**
 * 배송비
 */
export function calculateDeliveryFee<T extends Cart | Product>(items: T[]): number {
  return calculateTotalPrice(items) - calculateTotalDiscount(items) >= DELIVERY_FREE_MIN_PRICE ? 0 : BASIC_DELIVERY_FEE;
}
