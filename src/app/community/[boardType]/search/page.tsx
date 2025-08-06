import EventList from '@/app/community/EventList';
import NoticeList from '@/app/community/NoticeList';
import SearchForm from '@/components/post/SearchForm';
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
    userId?: string;
  }>;
  searchParams: Promise<{
    keyword: string;
  }>;
}

export async function generateMetadata({ params, searchParams }: SearchPageProps): Promise<Metadata> {
  const { boardType } = await params;
  const { keyword } = await searchParams;

  if (keyword === undefined) {
    return {
      title: `${boardType} : 검색 결과 -Twogether`,
    };
  }

  return {
    title: `${boardType} : ${keyword} 검색결과 - Twogether`,
    description: `${boardType} : ${boardType} : ${keyword} 검색결과 입니다.`,
    openGraph: {
      title: `${boardType} - Twogether`,
      description: `${boardType} 게시판`,
      url: `/community/${boardType}/search?keyword=${keyword}`,
    },
  };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { boardType } = await params;
  const { keyword } = await searchParams;
  const res = await getSearchPosts(boardType, keyword);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 제목 */}
      <h2 className="text-2xl font-bold mb-6">{boardType === 'notice' ? '공지사항' : '이벤트'} 검색</h2>

      {/* 검색 폼 */}
      <div className="mb-8">
        <SearchForm />
      </div>

      {/* 검색어 표시 */}
      {keyword && (
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-black">{keyword}</span> 검색 결과
          </p>
        </div>
      )}

      {/* 에러 메시지 */}
      {!res.ok && (
        <div className="text-center py-8">
          <p className="text-red-500">{res.message}</p>
        </div>
      )}

      {/* 검색 결과 */}
      {res.ok && keyword && (
        <ul>
          {res.item.length > 0 ? (
            boardType === 'notice' ? (
              res.item.map((post, i) => (
                <NoticeList key={post._id || i} post={post} boardType={boardType} isNotice={false} />
              ))
            ) : boardType === 'event' ? (
              res.item.map((post, i) => <EventList key={post._id || i} post={post} boardType={boardType} />)
            ) : (
              <li className="text-center py-8">
                <p className="text-gray-500">지원되지 않는 게시판 타입입니다.</p>
              </li>
            )
          ) : (
            <li className="text-center py-8">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </li>
          )}
        </ul>
      )}

      {/* 검색어가 없을 때 안내 메시지 */}
      {!keyword && res.ok && (
        <div className="text-center py-8">
          <p className="text-gray-500">검색어를 입력해주세요.</p>
        </div>
      )}
    </div>
  );
}
