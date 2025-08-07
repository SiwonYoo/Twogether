import ReviewPostForm from '@/app/my-page/order-list/[orderId]/[productId]/review-post/ReviewPostForm';
import ProductItem from '@/app/my-page/order-list/[orderId]/ProductItem';
import { getProductById } from '@/data/functions/shop';
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

  const data = await getProductById(Number(productId));

  let item;
  if (data.ok) {
    item = {
      _id: data.item._id,
      image: { path: data.item.mainImages[0].path },
      name: data.item.name,
      price: data.item.price,
      extra: { salePrice: data.item.extra.salePrice, isSale: data.item.extra.isSale },
    };
  }

  if (!item) return;

  return (
    <>
      <main className="px-4">
        <ProductItem item={item} />
        <ReviewPostForm orderId={Number(orderId)} productId={Number(productId)} productPrice={item.price} />
      </main>
    </>
  );
}

export default ReviewPost;
