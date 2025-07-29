import ImagesSwiper from '@/components/product/ImagesSwiper';
import LikeButton from '@/components/product/LikeButton';
import { Product } from '@/types/product';
import Link from 'next/link';

interface ProductCardItemProps {
  productType: string;
  data: Product[];
}
export default function ProductCardItem({ productType, data }: ProductCardItemProps) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <li key={index}>
            <Link href={`/shop/${productType}/${item._id}`}>
              <ImagesSwiper data={data} height={'31.25rem'} />
            </Link>
            <div className="flex justify-between mt-4">
              <Link href={`/shop/${productType}/${item._id}`}>
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-[.75rem]">{item.price}</p>
                </div>
              </Link>
              <LikeButton id={Number(item._id)} />
            </div>
          </li>
        );
      })}
    </>
  );
}
