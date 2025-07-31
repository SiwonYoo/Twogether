import ReviewPostForm from '@/app/my-page/order-list/[orderId]/[productId]/review-post/ReviewPostForm';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderId: string; productId: string }>;
}): Promise<Metadata> {
  const { orderId, productId } = await params;
  return {
    title: '리뷰 작성 - Twogether',
    description: 'Twogether의 리뷰 작성 페이지입니다.',

    openGraph: {
      title: '리뷰 작성 - Twogether',
      description: 'Twogether의 리뷰 작성 페이지입니다.',
      url: `/my-page/order-list/${orderId}/${productId}/review-post`,
    },
  };
}

async function ReviewPost({ params }: { params: Promise<{ orderId: string; productId: string }> }) {
  const { orderId, productId } = await params;

  /*  TODO orderId와 productId로 Product 한 건 조회해서 item에 담기 */

  return (
    <>
      <main className="px-4">
        {/* <ProductItem item={item} /> */}
        <ReviewPostForm orderId={orderId} productId={productId} />
      </main>
    </>
  );
}

export default ReviewPost;
