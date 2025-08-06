'use client';

import ReviewItem from '@/app/my-page/review/ReviewItem';
import { getProductReview } from '@/data/functions/review';
import { Product } from '@/types';
import { Review } from '@/types/review';
import { Star } from 'lucide-react';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import { useEffect, useState } from 'react';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface ReviewPageProps {
  product: Product;
}

export default function ReviewPage({ product }: ReviewPageProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const data = await getProductReview(Number(product._id));
      if (data.ok === 0) {
        return;
      }
      if (data.ok === 1 && data.item) {
        setReviews(data.item);
      }
    }
    fetchReviews();
  }, [product._id]);

  const starAvg = [
    { _id: 1, value: '별로에요' },
    { _id: 2, value: '그냥 그래요' },
    { _id: 3, value: '보통이에요' },
    { _id: 4, value: '맘에 들어요' },
    { _id: 5, value: '아주좋아요' },
  ];

  // 별점 카운트
  const starCounts = [1, 2, 3, 4, 5].reduce((acc, val) => {
    acc[val] = reviews.filter((item) => Number(item.rating) === val).length;
    return acc;
  }, {} as Record<number, number>);

  const avgStar = reviews.length > 0 ? reviews.reduce((sum, item) => sum + Number(item.rating), 0) / reviews.length : 0;

  return (
    <>
      <h2 className={`${JudsonFont.className} text-2xl my-4`}>Review ({reviews.length})</h2>

      {/* 상품 별점 계산 시작 */}
      <article className="flex justify-center items-center gap-8 my-6">
        <div className="flex items-center gap-2">
          <Star fill="var(--color-primary)" />
          <p className={`${JudsonFont.className} font-bold text-5xl`}>{avgStar.toFixed(1)}</p>
        </div>
        <ul>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = starCounts[star] || 0;
            const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
            const label = starAvg.find((s) => s._id === star)?.value || '';
            return (
              <li key={star} className="flex items-center gap-2 my-1">
                <span className="w-19">{label}</span>
                <div className="relative flex-1 w-[6.25rem] min-w-[6.25rem] max-w-[10.625rem] h-2 bg-(--color-gray-250) rounded">
                  <span
                    className={`${JudsonFont.className} absolute top-0 left-0 h-2 bg-primary rounded`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={`${JudsonFont.className} text-right`}>{count}</span>
              </li>
            );
          })}
        </ul>
      </article>
      {/* 상품 별점 계산 종료 */}

      {/* 상품 리뷰 조회 시작 */}
      <ul className="flex flex-col items-center gap-4">
        {reviews.map((item) => (
          <li key={item._id} className="w-full">
            <ReviewItem review={item} />
          </li>
        ))}
      </ul>
      {/* 상품 리뷰 조회 종료 */}
    </>
  );
}
