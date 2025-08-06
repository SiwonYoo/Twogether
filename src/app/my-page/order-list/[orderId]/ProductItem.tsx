import Image from 'next/image';

export interface ProductItemProps {
  _id: number;
  image: {
    path: string;
  };
  name: string;
  price: number;
  extra: {
    isSale?: boolean;
    salePrice?: number;
  };
}

function ProductItem({ item }: { item: ProductItemProps }) {
  return (
    <>
      <div className="flex gap-4 justify-between items-center pb-4 border-b-[.0625rem] border-gray-150">
        <Image src={item.image.path} width={50} height={50} alt={item.name} className="aspect-square object-cover" />
        <div className="flex-1 min-w-0">
          <p className="mb-1 truncate">{item.name}</p>
          <div className="flex gap-2 text-sm">
            <span>상품 금액</span>
            {item.extra.isSale && item.extra.salePrice ? (
              <p>
                <s>
                  <span className="text-gray-350">{item.price.toLocaleString()}원</span>
                </s>
                <span className="ml-1 text-error">{(item.price - item.extra.salePrice).toLocaleString()}원</span>
              </p>
            ) : (
              <span>{item.price.toLocaleString()}원</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
