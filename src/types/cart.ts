import { Product } from '@/types/product';

// 장바구니 응답 전체
export interface CartResponse {
  ok: number;
  item: Cart[];
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
}

// 장바구니 아이템
export interface Cart {
  _id: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product & {
    image?: {
      path: string;
    };
  };
  extra: {
    selectedSize: string;
  };
}
