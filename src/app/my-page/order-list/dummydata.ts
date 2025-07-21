// 상품 한 개
export interface OrderItem {
  _id: number;
  name: string;
  image: string;
  quantity?: number;
  price: number;
  review_id?: number;
  size: 'S' | 'M' | 'L' | 'FREE' /* api에는 없음(확인하기) */;
}

// 주문 한 건
interface OrderDetail {
  _id: number;
  user_id: number;
  products: OrderItem[];
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
  address: {
    name: string;
    value: string;
  };
  delivery?: {
    company: string;
    trackingNumber: string;
    url: string;
  };
  createdAt: string;
  updatedAt?: string;
}

// 주문 여러 건
export const orderList: OrderDetail[] = [
  {
    _id: 1,
    createdAt: '25.08.08',
    products: [
      {
        _id: 1,
        name: '러블리 민트 실크 스킨 반팔 상하의 세트(남녀 공용)',
        image: '/images/products/short-sleeve/01/thumbnail.jpg',
        price: 56900,
        size: 'M',
      },
      {
        _id: 2,
        name: '디아나 피치기모 긴팔 상하의 세트(남녀공용)',
        image: '/images/products/short-sleeve/02/thumbnail.jpg',
        price: 89000,
        size: 'S',
      },
    ],
    user_id: 11,
    cost: {
      products: 219000,
      shippingFees: 3000,
      discount: {
        products: 4000,
        shippingFees: 0,
      },
      total: 210000,
    },
    address: {
      name: '회사',
      value: '서울 종로구 종로3길 17 D1동 16층, 17층[03155]',
    },
  },
  {
    _id: 2,
    createdAt: '25.07.27',
    products: [
      {
        _id: 1,
        name: '플레인 피치기모 긴팔 상하의 세트(남녀공용)',
        image: '/images/products/short-sleeve/03/thumbnail.jpg',
        price: 99000,
        size: 'L',
      },
      {
        _id: 2,
        name: '돌체 블랙 쿨스킨 반팔 상하의 세트(남녀공용)',
        image: '/images/products/short-sleeve/04/thumbnail.jpg',
        price: 34000,
        size: 'FREE',
      },
    ],
    user_id: 22,
    cost: {
      products: 219000,
      shippingFees: 3000,
      discount: {
        products: 4000,
        shippingFees: 0,
      },
      total: 210000,
    },
    address: {
      name: '집',
      value: '서울 동대문구 3길 17 D1동 16층, 17층[12345]',
    },
  },
  {
    _id: 3,
    createdAt: '25.08.10',
    products: [
      {
        _id: 1,
        name: '상품3-1',
        image: '/images/products/short-sleeve/01/thumbnail.jpg',
        price: 56900,
        size: 'M',
      },
      {
        _id: 2,
        name: '상품3-2',
        image: '/images/products/short-sleeve/02/thumbnail.jpg',
        price: 89000,
        size: 'S',
      },
    ],
    user_id: 33,
    cost: {
      products: 219000,
      shippingFees: 3000,
      discount: {
        products: 4000,
        shippingFees: 0,
      },
      total: 210000,
    },
    address: {
      name: '친구 집',
      value: '경기도 강릉..',
    },
  },
  {
    _id: 4,
    createdAt: '25.07.20',
    products: [
      {
        _id: 1,
        name: '상품4-1',
        image: '/images/products/short-sleeve/03/thumbnail.jpg',
        price: 99000,
        size: 'L',
      },
      {
        _id: 2,
        name: '상품4-2',
        image: '/images/products/short-sleeve/04/thumbnail.jpg',
        price: 34000,
        size: 'FREE',
      },
    ],
    cost: {
      products: 219000,
      shippingFees: 3000,
      discount: {
        products: 4000,
        shippingFees: 0,
      },
      total: 210000,
    },
    user_id: 44,
    address: {
      name: '학교',
      value: '제주도 3길 17 D1동 16층, 17층[12345]',
    },
  },
];
