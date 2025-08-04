import ProductItem from '@/app/my-page/order-list/[orderId]/ProductItem';
import EditReviewForm from '@/app/my-page/review/[reviewId]/edit-review/EditReviewForm';
import { getReview } from '@/data/functions/review';
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

  if (!reviewData.ok) return;
  const review = reviewData.item[0];

  const item = {
    _id: review.product_id,
    image: {
      path: review.product.image.path,
    },
    name: review.product.name,
    price: review.extra.productPrice,
  };

  return (
    <>
      <main className="px-4">
        <ProductItem item={item} />
        <EditReviewForm review={review} />
      </main>
    </>
  );
}

export default EditReview;
