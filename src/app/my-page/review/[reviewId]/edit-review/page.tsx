import ProductItem from '@/app/my-page/order-list/[orderId]/ProductItem';
import { orderList } from '@/app/my-page/order-list/dummydata';
import EditReviewForm from '@/app/my-page/review/[reviewId]/edit-review/EditReviewForm';
import { getReview } from '@/data/functions/review';
import { Review } from '@/types/review';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ reviewId: number }> }): Promise<Metadata> {
  const { reviewId } = await params;
  return {
    title: '리뷰 수정 - Twogether',
    description: 'Twogether의 리뷰 수정 페이지입니다.',

    openGraph: {
      title: '리뷰 수정 - Twogether',
      description: 'Twogether의 리뷰 수정 페이지입니다.',
      url: `/my-page/review/${reviewId}/edit-review`,
    },
  };
}

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
            {/* TODO dummydata - 주문 내역 데이터 넣을 것 */}
            {<ProductItem item={orderList[0].products[0]} />}
            <EditReviewForm review={review} />
          </>
        )}
      </main>
    </>
  );
}

export default EditReview;
