// 전체 상품 객체 타입
export interface Product {
  _id: number;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: number;
  buyQuantity: number;
  mainImages: MainImage[];
  content: string;
  extra: Extra;
}

export interface ProductDetails {
  productType: string;
  product: Product;
}

// 상품 리스트에 사용되는 요약 타입
export interface ProductList {
  _id: number;
  price: number;
  name: string;
  extra: {
    isBest: boolean;
    isSale: boolean;
    category: string[];
  };
}

// 상품 대표 이미지
export interface MainImage {
  _id?: number;
  path: string;
  name: string;
}

// 사이즈 정보 단위
export interface SizeInfoEntry {
  headers: string[];
  values: string[];
}

// 원단 관련 정보
export interface FabricInfo {
  label: string;
  values: string[];
  selected: string[];
}

// 세탁 정보
export interface WashingInfo {
  _id: number;
  path: string;
  label: string;
}

// 상품 부가 정보
export interface Extra {
  isBest: boolean;
  isSale: boolean;
  salePrice?: number;
  category: string;
  isLike: boolean;
  size: ExtraSize[];
  SizeInfo: SizeInfoEntry[];
  FabricInfo: FabricInfo[];
  washingInfo: WashingInfo[];
}

export interface ExtraSize {
  value: string;
  text: string;
}
