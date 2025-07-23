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
  path: string;
  name: string;
  originalname: string;
}

// 사이즈 정보 단위
export interface SizeInfoEntry {
  headers: string[];
  values: string[];
}

// 사이즈 정보 묶음
export interface SizeInfoBlock {
  defaultSize: SizeInfoEntry[];
}

// 원단 관련 정보
export interface FabricInfo {
  label: string;
  values: string[];
  selected: string | string[];
}

// 세탁 정보
export interface WashingInfo {
  _id: number;
  label: string;
}

// 상품 부가 정보
export interface Extra {
  isBest: boolean;
  isSale: boolean;
  category: string[];
  isLike: boolean;
  size: string;
  SizeInfo: SizeInfoBlock[];
  FabricInfo: FabricInfo[];
  washingInfo: WashingInfo[];
}
