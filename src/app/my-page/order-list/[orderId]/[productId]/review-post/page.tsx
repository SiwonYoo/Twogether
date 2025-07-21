import ReviewPostForm from '@/app/my-page/order-list/[orderId]/[productId]/review-post/ReviewPostForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '리뷰 작성 - Twogether',
  openGraph: {
    title: '리뷰 작성 - Twogether',
    description: '리뷰 작성',
    url: '/my-page/order-list/[orderId]/[productId]/review-post',
  },
};

function ReviewPost() {
  return (
    <>
      <main className="px-4">
        <ReviewPostForm />
      </main>
    </>
  );
}

export default ReviewPost;
