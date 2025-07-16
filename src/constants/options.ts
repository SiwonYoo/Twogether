// 상품의 옵션에 대한 상수를 정의합니다.

const SIZE_OPTIONS = ['FREE', 'S', 'M', 'L', 'XL'] as const;
export type SizeOption = (typeof SIZE_OPTIONS)[number];
