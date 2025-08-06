import { SearchPageProps } from '@/app/community/[boardType]/search/page';
import QnaSearchClient from './QnaSearchClient';
import { Metadata } from 'next';

/**
 * 1:1문의 검색 페이지 (Server Component)
 */

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
      url: `/my-page/${boardType}/search?keyword=${keyword}`,
    },
  };
}

export default function QnaSearchPage() {
  return <QnaSearchClient />;
}
