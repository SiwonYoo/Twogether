import ImagesSwiper from '@/components/product/ImagesSwiper';
import LikeToggleButton from '@/components/product/LikeButton';
import { Product } from '@/types';
import Link from 'next/link';

function SearchResult({ data }: { data: Product[] }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-4 my-6">
        {data.map((item, index) => {
          return (
            <li key={index}>
              <Link href={`/shop/${item.extra.category}/${item._id}`}>
                <ImagesSwiper data={data} height={'31.25rem'} />
              </Link>
              <div className="flex justify-between mt-4">
                <Link href={`/shop/${item.extra.category}/${item._id}`}>
                  <div className="text-left">
                    <h3 className="font-bold">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-[.75rem] ${
                          item.extra.isSale
                            ? 'text-(--color-gray-450) line-through decoration-2 decoration-(--color-error)'
                            : ''
                        }`}
                      >
                        {item.price}
                      </p>
                      <p className="text-[.75rem]">{item.extra.isSale ? item.extra.salePrice : ''}</p>
                    </div>
                  </div>
                </Link>
                {<LikeToggleButton data={item} />}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default SearchResult;
