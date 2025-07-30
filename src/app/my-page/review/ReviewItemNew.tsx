'use client';

import ProductItem from '@/app/my-page/order-list/[orderId]/ProductItem';
import { orderList } from '@/app/my-page/order-list/dummydata';
import ReviewDeleteForm from '@/app/my-page/review/ReviewDeleteForm';
import ReviewImagesModal from '@/app/my-page/review/ReviewImagesModal';
import useUserStore from '@/stores/useUserStore';
import { Review } from '@/types/review';
import { ChevronDown, ChevronUp, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ReviewItemProps {
  setRefreshKey?: Dispatch<SetStateAction<number>>;
  showProductInfo?: boolean;
  review: Review;
}

function ReviewItem({ setRefreshKey, showProductInfo = false, review }: ReviewItemProps) {
  const [fullContent, setFullContent] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const path = usePathname();

  const loginUser = useUserStore((state) => state.user) || null;

  const showFullContent = () => {
    setFullContent(!fullContent);
  };

  const showComment = () => {
    setCommentBox(!commentBox);
  };

  const fillThumbsUp = () => {
    setThumbsUp(!thumbsUp);
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

  return (
    <>
      <div className="p-4 rounded-md border-[.0625rem] border-gray-150">
        {showProductInfo && (
          <div className="mb-5">
            {/* TODO dummydata - 주문 내역 데이터 넣을 것 */}
            {review.product && <ProductItem item={orderList[0].products[review.product._id - 1]} />}
          </div>
        )}
        <div className="flex justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span>{review.user.name} 님</span>
              <span className="flex">{ratingStar}</span>
              <span className="text-sm text-gray-250">{review.createdAt.split(' ')[0].slice(2)}</span>
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
                  src={`${API_URL}/${review.extra.images[0]}`}
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
            <button className="inline-flex items-center gap-1 mr-2" onClick={showComment}>
              댓글 {review.extra.comment?.length ?? 0}
              {commentBox ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button className="inline-flex items-center gap-1" onClick={fillThumbsUp}>
              도움돼요
              <ThumbsUp size={16} fill={thumbsUp ? '#2E1F42' : 'none'} />
            </button>
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
        <div>
          {commentBox &&
            review.extra.comment &&
            review.extra.comment.map((item, idx) => (
              <div key={idx} className="mt-2 pt-2 border-t-[.0625rem] border-gray-150 text-sm">
                <div className="flex items-center gap-1 mb-1">
                  <span>{item.user.name}님</span>
                  <span className="flex-1 text-right  text-gray-250">{item.createdAt}</span>
                </div>
                <p>{item.content}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ReviewItem;
