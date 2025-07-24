import QnaList from '@/app/my-page/[boardType]/QnaList';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Judson } from 'next/font/google';
import Link from 'next/link';
import { getPosts } from '@/data/functions/post';
import { Post } from '@/types/post';
import { Metadata } from 'next';

const posts = [
  {
    id: '1',
    type: 'qna',
    name: '나문희',
    title: '문의 드립니다.',
    content: '언제 배송돼요???????????????',
    createdAt: '25.08.01',
  },
];

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export async function generateMetadata({ params }: ListPageProps): Promise<Metadata> {
  const { boardType } = await params;
  return {
    title: boardType.toUpperCase() + '- Twogether',
    description: boardType.toUpperCase() + '게시판입니다.',
    openGraph: {
      title: boardType.toUpperCase() + '- Twogether',
      description: boardType.toUpperCase() + '게시판입니다.',
      url: `/my-page/${boardType}`,
    },
  };
}

export interface ListPageProps {
  params: Promise<{
    boardType: string;
  }>;
}

export default async function QnaPage({ params }: ListPageProps) {
  const { boardType } = await params;
  const res = await getPosts(boardType);

  return (
    <>
      <h2 className={`${JudsonFont.className} text-2xl text-center`}>Q&A</h2>
      {/* 공지 부분은 하드코딩 */}

      <ul>
        {res.ok ? (
          res.item.map((post: Post) => <QnaList key={post._id} post={post} boardType={boardType} />)
        ) : (
          <p>{res.message}</p>
        )}
        {/* 게시판 목록 */}
      </ul>
      <div className="text-right mt-4">
        <Link href="/my-page/qna/new">
          <Button shape="square">작성</Button>
        </Link>
      </div>
      <div className="mt-40">
        <Input id="search" label="검색" search={true} />
      </div>
    </>
  );
}
