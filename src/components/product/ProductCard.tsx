import ProductCardItem from '@/components/product/ProductCardItem';

interface ProductCardProps {
  productTitle: string;
  price: number;
  id: number;
}

/**
 * 제품 카드 컨포넌트입니다. api에서 데이터를 받아와 생성됩니다.
 * @param param0 - 제품의 이름과 가격을 담든 매개변수 입니다.
 * @returns
 */

export default function ProductCard() {
  const datas: ProductCardProps[] = [
    {
      id: 1,
      productTitle: '잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷',
      price: 70000,
    },
    {
      id: 2,
      productTitle: '긴팔 잠옷',
      price: 15000,
    },
    {
      id: 3,
      productTitle: '잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷',
      price: 70000,
    },
    {
      id: 4,
      productTitle: '잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷',
      price: 70000,
    },
    {
      id: 5,
      productTitle: '잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷잠옷',
      price: 70000,
    },
  ];
  return (
    <>
      <ul className="grid grid-cols-2 gap-4 my-4">
        {datas.map((item) => {
          return <ProductCardItem productTitle={item.productTitle} price={item.price} key={item.id} />;
        })}
      </ul>
    </>
  );
}
