// utils/cart.ts
import { Cart } from '@/types/cart';
import { BASIC_DELIVERY_FEE, DELIVERY_FREE_MIN_PRICE } from '@/constants/money';

/**
 * 총 상품금액(정가 그대로)을 계산하여 반환하는 함수입니다.
 *
 * @param items 장바구니 아이템 배열
 * @returns 총 상품금액
 */
export const calculateTotalPrice = (items: Cart[]): number =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

/**
 * 총 할인금액을 계산하여 반환하는 함수입니다.
 *
 * @param items 장바구니 아이템 배열
 * @returns 총 할인금액
 */
export const calculateTotalDiscount = (items: Cart[]): number =>
  items.reduce((sum, item) => sum + 1000 * item.quantity, 0);

/**
 * 결제예정금액(정가-할인금액의 총합)을 계산하여 반환하는 함수입니다.
 *
 * @param items 장바구니 아이템 배열
 * @returns 총 상품금액
 */
export const calculateFinalAmount = (items: Cart[]): number =>
  calculateTotalPrice(items) - calculateTotalDiscount(items) + calculateDeliveryFee(items);

/**
 * 배송비(5만원 이상 무료, 기본 3천원)를 계산하여 반환하는 함수입니다.
 *
 * @param items 장바구니 아이템 배열
 * @returns 배송비
 */
export const calculateDeliveryFee = (items: Cart[]): number =>
  calculateTotalPrice(items) - calculateTotalDiscount(items) >= DELIVERY_FREE_MIN_PRICE ? 0 : BASIC_DELIVERY_FEE;
