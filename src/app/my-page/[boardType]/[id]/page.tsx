import { getPost } from '@/data/functions/post';
import ProductName from '@/components/post/ProductName';
import ButtonSection from '@/app/my-page/[boardType]/[id]/ButtonSection';

interface InfoPageProps {
  params: Promise<{
    boardType: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: InfoPageProps) {
  const { boardType, id } = await params;
  const post = await getPost(Number(id));
  if (post.ok) {
    return {
      title: `${post.item.title} - Twogether`,
      description: `${post.item.content} 게시판입니다.`,
      openGraph: {
        title: `${boardType} - Twogether`,
        description: `${boardType} 게시판입니다.`,
        url: `/community/${boardType}/${id}`,
      },
    };
  }
  return {
    title: '게시글을 찾을 수 없습니다 - Twogether',
    description: '존재하지 않는 게시글입니다.',
    openGraph: {
      title: '404 - Twogether',
      description: '존재하지 않는 게시글입니다.',
      url: `/community/${boardType}/${id}`,
    },
  };
}

export default async function QnaInfoPage({ params }: InfoPageProps) {
  const { boardType, id } = await params;
  const res = await getPost(Number(id));

  return (
    <>
      <main className="mb-25 mx-4">
        {res.ok === 0 ? (
          <p>{res.message}</p>
        ) : (
          <>
            <h3 className="my-4 pb-4 border-b-1 border-gray-250">{res.item?.title}</h3>
            <div className="flex justify-between gap-8 text-gray-250 mb-6">
              <p>{res.item?.user.name}</p>
              <p className="mr-auto">조회 {res.item?.views}</p>
              <p>{res.item.createdAt}</p>
            </div>
            <ProductName productId={res.item.product_id} />
            <p className="py-10 border-b-1 border-gray-150">{res.item?.content}</p>
            <ButtonSection boardType={boardType} postId={res.item._id} authorId={res.item.user._id} />
            <p className="text-right text-sm mb-2">* 답변이 달린 후에는 수정이 불가합니다.</p>
            <div className="h-50 p-4 bg-gray-150">
              <p>빠른 시일 내에 답변 드리겠습니다 :)</p>
            </div>
          </>
        )}
      </main>
    </>
  );
}
