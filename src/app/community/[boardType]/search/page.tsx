import EventList from '@/app/community/EventList';
import NoticeList from '@/app/community/NoticeList';
import MyQnaList from '@/app/my-page/[boardType]/MyQnaList';
import SearchForm from '@/components/common/SearchForm';
import { getSearchPosts } from '@/data/functions/post';
import { Metadata } from 'next';
import { Judson } from 'next/font/google';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export interface SearchPageProps {
  params: Promise<{
    boardType: string;
  }>;
  searchParams: Promise<{
    keyword: string;
  }>;
}

export async function generateMetadata({ params, searchParams }: SearchPageProps): Promise<Metadata> {
  const { boardType } = await params;
  const { keyword } = await searchParams;

  return {
    title: `${boardType} : ${keyword} 검색결과 - Twogether`,
    description: `${boardType} : ${boardType} : ${keyword} 검색결과 입니다.`,
    openGraph: {
      title: `${boardType} - Twogether`,
      description: `${boardType} 게시판`,
      url: `/${boardType}`,
      images: {
        url: '/images/front-end.png',
      },
    },
  };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { boardType } = await params;
  const { keyword } = await searchParams;
  const res = await getSearchPosts(boardType, keyword);

  return (
    <main className="mx-4">
      <h2 className={`mb-4 ${JudsonFont.className} text-2xl text-center`}>
        <strong>{`"${keyword}"`}</strong> 검색결과
      </h2>

      {/* boardType의 검색 결과에 따라 보여지는 게시글 목록 */}

      <ul>
        {res.ok ? (
          boardType === 'qna' ? (
            <MyQnaList posts={res.item} boardType={boardType} />
          ) : boardType === 'notice' ? (
            res.item.map((post, i) => <NoticeList key={i} post={post} boardType={boardType} isNotice={false} />)
          ) : boardType === 'event' ? (
            res.item.map((post, i) => <EventList key={i} post={post} boardType={boardType} />)
          ) : (
            <p>지원되지 않는 게시판 타입입니다.</p>
          )
        ) : (
          <p className="text-red-500">{res.message}</p>
        )}
      </ul>

      {/* 글 작성 버튼 */}
      <div className="text-right mt-4 mx-4"></div>
      <SearchForm />
    </main>
  );
}
