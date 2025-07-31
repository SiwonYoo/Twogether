// 개별 상품 타입
export interface OrderProduct {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: {
    _id: number;
    path: string;
    name: string;
    originalname: string;
  };
  price: number;
  extra: {
    isBest: boolean;
    isSale: boolean;
    salePrice?: number;
    category: string;
    isLike: boolean;
    size: { value: string; text: string }[];
    SizeInfo: { headers: string[]; values: string[] }[];
    FabricInfo: {
      label: string;
      values: string[];
      selected?: string[];
    }[];
    washingInfo: { _id: number; label: string }[];
  };
}

// 주문 공통 필드
export interface Order {
  _id: number;
  products: OrderProduct[];
  address: { name: string; value: string };
  extra: { shippingMemo: string; paymentMethod: string };
  state: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  cost: {
    products: number;
    shippingFees: number;
    discount: { products: number; shippingFees: number };
    total: number;
  };
}

// 단일 주문 응답 (GET /orders/:id)
export interface SingleOrderResponse {
  ok: number;
  item: Order;
}

// 주문 목록 응답 (GET /orders)
export interface OrderListResponse {
  ok: number;
  item: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
