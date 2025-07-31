import Button from '@/components/common/Button';
import { getPost } from '@/data/functions/post';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import { Judson } from 'next/font/google';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

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
  const boardTypeStr = boardType.toUpperCase();
  if (!post.ok) {
    return <div>{post.message}</div>;
  }

  return (
    <>
      <main className="mb-50">
        <div className="flex justify-center items-center relative">
          <Link href={`/community/${boardType}`}>
            <ChevronLeft className="absolute left-4 bottom-2 cursor-pointer" />
          </Link>
          <h2 className={`${JudsonFont.className} text-2xl`}>{boardTypeStr}</h2>
        </div>
        <h3 className="my-4 border-b-1 border-gray-250">{post.item?.title}</h3>
        <div className="flex justify-between gap-8 text-gray-250 mb-6">
          <p>{post.item?.user.name}</p>
          <p className="mr-auto">조회 {post.item.views}</p>
          <p>{post.item.createdAt}</p>
        </div>
        <p>{post.item.content}</p>
      </main>
      <div className="mb-10">
        <Link href={`/community/${boardType}`}>
          <Button shape="square" size="lg">
            목록
          </Button>
        </Link>
      </div>
    </>
  );
}
