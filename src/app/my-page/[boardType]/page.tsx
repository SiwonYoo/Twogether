import { getPosts } from '@/data/functions/post';
import { Judson } from 'next/font/google';
import { Metadata } from 'next';
import MyQnaList from './MyQnaList';
import Button from '@/components/common/Button';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export interface ListPageProps {
  params: {
    boardType: string;
  };
}

export async function generateMetadata({ params }: ListPageProps): Promise<Metadata> {
  const { boardType } = await params;
  return {
    title: `${boardType.toUpperCase()} - Twogether`,
    description: `${boardType.toUpperCase()} 게시판입니다.`,
    openGraph: {
      title: `${boardType.toUpperCase()} - Twogether`,
      description: `${boardType.toUpperCase()} 게시판입니다.`,
      url: `/my-page/${boardType}`,
    },
  };
}

export default async function QnaPage({ params }: ListPageProps) {
  const { boardType } = await params;
  const res = await getPosts(boardType);

  return (
    <>
      <h2 className={`${JudsonFont.className} text-2xl text-center`}>Q&A</h2>

      {/* 로그인한 유저의 게시글만 필터링해서 보여주는 컴포넌트 */}
      {res.ok ? <MyQnaList posts={res.item} boardType={boardType} /> : <p className="text-red-500">{res.message}</p>}

      {/* 글 작성 버튼 */}
      <div className="text-right mt-4">
        <Link href={`/my-page/${boardType}/new`}>
          <Button shape="square">작성</Button>
        </Link>
      </div>
    </>
  );
}
