import Image from 'next/image';
import Link from 'next/link';

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
    category?: string;
  };
}

function ProductItem({ item, withLink = false }: { item: ProductItemProps; withLink?: boolean }) {
  return (
    <>
      <div className="flex gap-4 justify-between items-center pb-4 border-b-[.0625rem] border-gray-150">
        <Image
          src={item.image.path}
          width={50}
          height={50}
          alt={item.name}
          className="rounded-md aspect-square object-cover"
        />
        <div className="flex-1 min-w-0">
          {withLink ? (
            <Link href={`/shop/${item.extra.category}/${item._id}`}>
              <p className="mb-1 truncate">{item.name}</p>
            </Link>
          ) : (
            <p className="mb-1 truncate">{item.name}</p>
          )}
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
