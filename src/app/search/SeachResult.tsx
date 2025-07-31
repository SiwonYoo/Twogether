import ImagesSwiper from '@/components/product/ImagesSwiper';
import LikeButton from '@/components/product/LikeButton';
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
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-[.75rem]">{item.price}</p>
                  </div>
                </Link>
                {<LikeButton data={item} id={Number(item._id)} />}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default SearchResult;
