'use client';

import ProductItem from '@/app/my-page/order-list/[orderId]/ProductItem';
import { orderList } from '@/app/my-page/order-list/dummydata';
import ReviewDeleteForm from '@/app/my-page/review/ReviewDeleteForm';
import useUserStore from '@/stores/useUserStore';
import { Review } from '@/types/review';
import { ChevronDown, ChevronUp, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ReviewItemProps extends Review {
  setRefreshKey: Dispatch<SetStateAction<number>>;
  showProductInfo?: boolean;
}

function ReviewItem({
  setRefreshKey,
  showProductInfo = false,
  _id,
  product,
  rating,
  user,
  content,
  createdAt,
  extra,
}: ReviewItemProps) {
  const [fullContent, setFullContent] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);
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
  const fillStar = rating;

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
            {/* TODO dummydata - 주문 내역 데이터 준비되면 넣을 것 */}
            {product && <ProductItem item={orderList[0].products[product._id - 1]} />}
          </div>
        )}
        <div className="flex justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span>{user.name} 님</span>
              <span className="flex">{ratingStar}</span>
              <span className="flex-1 text-right text-sm text-gray-250">{createdAt}</span>
            </div>
            <p className="text-sm text-gray-250">
              {extra.height && (
                <span>
                  키 {extra.height}
                  <span aria-hidden> | </span>
                </span>
              )}

              {extra.height && (
                <span>
                  몸무게 {extra.weight}
                  <span aria-hidden> | </span>
                </span>
              )}
              {extra.height && <span>사이즈 {extra.size}</span>}
            </p>
            {content.length > 20 ? (
              <div className="flex my-2" onClick={showFullContent}>
                <span className={`${fullContent ? '' : 'overflow-hidden text-ellipsis line-clamp-2'}`}>{content}</span>
              </div>
            ) : (
              <p className="my-2">{content}</p>
            )}
            <div className="flex justify-between text-sm">
              <div>
                <button className="inline-flex items-center gap-1 mr-2" onClick={showComment}>
                  댓글 {extra.comment?.length ?? 0}
                  {commentBox ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button className="inline-flex items-center gap-1" onClick={fillThumbsUp}>
                  도움돼요
                  <ThumbsUp size={16} fill={thumbsUp ? '#2E1F42' : 'none'} />
                </button>
              </div>
              <div>
                {loginUser && (
                  <div className="flex">
                    <Link href={`/my-page/review/${_id}/edit-review?redirect=${path}`}>수정</Link>
                    <span aria-hidden className="mx-1">
                      |
                    </span>
                    <ReviewDeleteForm _id={_id} setRefreshKey={setRefreshKey} />
                  </div>
                )}
              </div>
            </div>
          </div>
          {extra.images && (
            <Image
              src={`${API_URL}/${extra.images[0]}`}
              alt="리뷰 이미지"
              width={80}
              height={80}
              className="w-20 max-h-20 aspect-square object-cover rounded-md"
            />
          )}
        </div>
        <div>
          {commentBox &&
            extra.comment &&
            extra.comment.map((item, idx) => (
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
