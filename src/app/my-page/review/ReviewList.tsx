'use client';

import ReviewItem from '@/app/my-page/review/ReviewItem';
import { Review } from '@/types/review';
import { getReview } from '@/data/functions/review';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { deleteReview } from '@/data/actions/review';
import { User } from '@/types';

function ReviewList() {
  const [reviewList, setReviewList] = useState<Review[]>([]);

  const user = useUserStore((state) => state.user);
  const accessToken = user?.token?.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      let reviewData;
      if (accessToken) reviewData = await getReview(accessToken);
      if (reviewData?.ok) setReviewList(reviewData?.item);
    };
    fetchData();
  }, [accessToken]);

  const handleDelete = async (_id: number, loginUser: User) => {
    const result = await deleteReview(null, { _id, accessToken: loginUser?.token?.accessToken || '' });
    if (result.ok) {
      setReviewList((prev) => prev?.filter((item) => item._id !== _id));
    }
  };

  return !reviewList?.length ? (
    <p className="text-center">작성한 리뷰가 없습니다.</p>
  ) : (
    <>
      <div className="flex flex-col gap-4">
        {reviewList?.map((item, idx) => (
          <ReviewItem key={item._id} handleDelete={handleDelete} {...item}></ReviewItem>
        ))}
      </div>
    </>
  );
}

export default ReviewList;
