'use client';

import ProductItem, { ProductItemProps } from '@/app/my-page/order-list/[orderId]/ProductItem';
import ReviewDeleteForm from '@/app/my-page/review/ReviewDeleteForm';
import ReviewImagesModal from '@/app/my-page/review/ReviewImagesModal';
import { getProductById } from '@/data/functions/shop';
import useUserStore from '@/stores/useUserStore';
import { Review } from '@/types/review';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ReviewItemProps {
  setRefreshKey?: Dispatch<SetStateAction<number>>;
  showProductInfo?: boolean;
  review: Review;
}

function ReviewItem({ setRefreshKey, showProductInfo = false, review }: ReviewItemProps) {
  const [fullContent, setFullContent] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const path = usePathname();
  const [productData, setProductData] = useState<ProductItemProps>();

  const loginUser = useUserStore((state) => state.user) || null;

  const showFullContent = () => {
    setFullContent(!fullContent);
  };

  const ratingStar: React.ReactElement[] = [];
  const fillStar = review.rating;

  for (let i = 0; i < 5; i++) {
    ratingStar.push(
      i < fillStar ? (
        <Star key={i} size={16} color="#2E1F42" fill="#2E1F42" />
      ) : (
        <Star key={i} size={16} color="#2E1F42" />
      )
    );
  }

  useEffect(() => {
    if (!showProductInfo) return;

    async function getProductData() {
      const data = await getProductById(review.product._id);

      if (data.ok) {
        setProductData({
          _id: data.item._id,
          image: { path: data.item.mainImages[0].path },
          name: data.item.name,
          price: data.item.price,
          extra: { salePrice: data.item.extra.salePrice, isSale: data.item.extra.isSale },
        });
      }
    }

    getProductData();
  }, []);

  return (
    <>
      <div className="p-4 rounded-md border-[.0625rem] border-gray-150">
        {showProductInfo && productData && (
          <div className="mb-5">
            <ProductItem item={productData} />
          </div>
        )}
        {showProductInfo && !productData && (
          <div className="mb-5">
            <div className="pb-4 border-b-[.0625rem] border-gray-150 box-content h-[3.125rem]"></div>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span>{review.user.name} 님</span>
              <span className="flex">{ratingStar}</span>
            </div>
            <p className="text-xs text-gray-250">
              {review.extra.height && (
                <span>
                  키 {review.extra.height}
                  {(review.extra.weight || review.extra.size) && <span aria-hidden> | </span>}
                </span>
              )}

              {review.extra.weight && (
                <span>
                  몸무게 {review.extra.weight}
                  {review.extra.size && <span aria-hidden> | </span>}
                </span>
              )}
              {review.extra.size && <span>사이즈 {review.extra.size}</span>}
            </p>
            {review.content.length > 20 ? (
              <div className="flex my-2" onClick={showFullContent}>
                <span className={`${fullContent ? '' : 'overflow-hidden text-ellipsis line-clamp-2'} text-justify`}>
                  {review.content}
                </span>
              </div>
            ) : (
              <p className="my-2">{review.content}</p>
            )}
          </div>
          {review.extra.images && review.extra.images.length > 0 && (
            <>
              <button onClick={() => setModalOpen(true)} className="relative self-start">
                <Image
                  src={`${review.extra.images[0]}`}
                  alt="리뷰 이미지"
                  width={80}
                  height={80}
                  className="w-20 aspect-square object-cover rounded-md"
                  priority
                />
                {review.extra.images.length > 1 && (
                  <span className="absolute right-0 bottom-0 rounded-br-md rounded-tl-md bg-white text-xs p-0.5">
                    +{review.extra.images.length - 1}
                  </span>
                )}
              </button>
              <ReviewImagesModal images={review.extra.images} isOpen={isModalOpen} setOpen={setModalOpen} />
            </>
          )}
        </div>
        <div className="flex justify-between pt-4 text-sm">
          <div>
            <span className="text-sm text-gray-350">{review.createdAt.split(' ')[0].slice(2)} 작성</span>
          </div>
          <div>
            {loginUser?._id === review.user._id && (
              <div className="flex">
                <Link href={`/my-page/review/${review._id}/edit-review?redirect=${path}`} className="hover:underline">
                  수정
                </Link>
                <span aria-hidden className="mx-1">
                  |
                </span>
                <ReviewDeleteForm _id={review._id} setRefreshKey={setRefreshKey} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewItem;
