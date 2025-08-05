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
  product: {
    _id: number;
    name: string;
    price: number;
    quantity: number;
    buyQuantity: number;
    image: {
      _id: number;
      path: string;
      name: string;
    };
    extra: {
      isBest: boolean;
      isSale: boolean;
      category: string;
      isLike: boolean;
      salePrice: number;
      size: {
        value: string;
        text: string;
      }[];
      SizeInfo: {
        headers: string[];
        values: string[];
      }[];
      FabricInfo: {
        label: string;
        values: string[];
        selected: string[];
      }[];
      washingInfo: {
        _id: number;
        label: string;
      }[];
    };
  };
  extra: {
    selectedSize: string;
  };
}
