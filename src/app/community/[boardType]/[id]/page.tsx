import { getPost } from '@/data/functions/post';
import { Metadata } from 'next';

export async function generateMetadata({ params }: ListPageProps): Promise<Metadata> {
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

export interface ListPageProps {
  params: Promise<{
    boardType: string;
    id: string;
  }>;
}

export default async function BoardInfoPage({ params }: ListPageProps) {
  const { boardType, id } = await params;
  const post = await getPost(Number(id));

  if (!post.ok) {
    return <div>{post.message}</div>;
  }

  return (
    <>
      <main className="mb-50">
        <h3 className="my-4 pb-4 border-b-1 border-gray-250">{post.item?.title}</h3>
        <div className="flex justify-between gap-8 text-gray-250 mb-6">
          <p>{post.item?.user.name}</p>
          <p className="mr-auto">조회 {post.item.views}</p>
          <p>{post.item.createdAt}</p>
        </div>
        <div className="h-100 overflow-auto whitespace-pre-line leading-7">
          {post.item.content.replace(/([.!?])/g, '$1\n')}
        </div>
      </main>
    </>
  );
}
