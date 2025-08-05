import { Judson } from 'next/font/google';
import { Metadata } from 'next';
import MyQnaList from './MyQnaList';
import SearchForm from '@/components/common/SearchForm';
import LinkButton from '@/components/common/LinkButton';
import { notFound } from 'next/navigation';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export interface ListPageProps {
  params: Promise<{
    boardType: string;
  }>;
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
  const currentBoardType = ['qna'];

  if (!currentBoardType.includes(boardType)) {
    notFound();
  }
  return (
    <main className="mx-4 mb-20">
      <h2 className={`${JudsonFont.className} text-2xl text-center`}>Q&A</h2>
      <MyQnaList /> {/* API 요청은 이 안에서 함 */}
      <div className="text-right mt-4 mx-4">
        <LinkButton href="/my-page/qna/new" shape="square">
          작성
        </LinkButton>
      </div>
      <SearchForm />
    </main>
  );
}
