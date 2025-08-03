'use client';

import ReviewItem from '@/app/my-page/review/ReviewItemNew';
import { Review } from '@/types/review';
import { getMyReview } from '@/data/functions/review';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ReviewList() {
  const [reviewList, setReviewList] = useState<Review[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();
  const accessToken = user?.token?.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      let reviewData;
      if (accessToken) reviewData = await getMyReview(accessToken);

      if (reviewData?.ok === 0 && reviewData.message === 'unauthorized') {
        logout();
        router.replace(`/login?redirect=/my-page/review`);
      }

      if (reviewData?.ok) {
        setReviewList(reviewData?.item);
      }
    };
    fetchData();
  }, [accessToken, refreshKey]);

  return !reviewList ? (
    <p className="text-center">로딩 중..</p>
  ) : !reviewList.length ? (
    <p className="text-center">작성한 리뷰가 없습니다.</p>
  ) : (
    <>
      <div className="flex flex-col gap-4">
        {reviewList?.toReversed().map((item) => (
          <ReviewItem key={item._id} setRefreshKey={setRefreshKey} showProductInfo review={item}></ReviewItem>
        ))}
      </div>
    </>
  );
}

export default ReviewList;
