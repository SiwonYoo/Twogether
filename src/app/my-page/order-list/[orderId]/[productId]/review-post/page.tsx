import ReviewPostForm from '@/app/my-page/order-list/[orderId]/[productId]/review-post/ReviewPostForm';
import ProductItem from '@/app/my-page/order-list/[orderId]/ProductItem';
import { orderList } from '@/app/my-page/order-list/dummydata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '리뷰 작성 - Twogether',
  openGraph: {
    title: '리뷰 작성 - Twogether',
    description: '리뷰 작성',
    url: '/my-page/order-list/[orderId]/[productId]/review-post',
  },
};

async function ReviewPost({ params }: { params: Promise<{ orderId: string; productId: string }> }) {
  const { orderId, productId } = await params;

  const order = orderList[Number(orderId) - 1];
  const item = order.products[Number(productId) - 1];

  return (
    <>
      <main className="px-4">
        <ProductItem item={item} />
        <ReviewPostForm orderId={orderId} productId={productId} />
      </main>
    </>
  );
}

export default ReviewPost;
