import ProductItem from '@/app/my-page/order-list/[orderId]/ProductItem';
import { orderList } from '@/app/my-page/order-list/dummydata';
import EditReviewForm from '@/app/my-page/review/[reviewId]/edit-review/EditReviewForm';
import { getReview } from '@/data/functions/review';
import { Review } from '@/types/review';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '리뷰 수정 - Twogether',
  openGraph: {
    title: '리뷰 수정 - Twogether',
    description: '리뷰 수정',
    url: '/my-page/review/[reviewId]/edit-review',
  },
};

async function EditReview({ params }: { params: Promise<{ reviewId: number }> }) {
  const { reviewId } = await params;
  const reviewData = await getReview(reviewId);
  let review: Review | null;

  if (reviewData.ok) review = reviewData.item[0];
  else review = null;

  return (
    <>
      <main className="px-4">
        {review !== null && (
          <>
            {review.product && <ProductItem item={orderList[0].products[review.product._id]} />}
            <EditReviewForm review={review} />
          </>
        )}
      </main>
    </>
  );
}

export default EditReview;
