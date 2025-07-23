import EventList from '@/app/community/EventList';
import NoticeList from '@/app/community/NoticeList';
import Input from '@/components/common/Input';
import { getPosts } from '@/data/functions/post';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: ListPageProps): Promise<Metadata> {
  const { boardType } = await params;
  return {
    title: `${boardType} - Twogether`,
    description: `${boardType} 게시판입니다.`,
    openGraph: {
      title: `${boardType} - Twogether`,
      description: `${boardType} 게시판입니다.`,
      url: `/${boardType}`,
      images: {
        url: '/images/front-end.png',
      },
    },
  };
}

export interface ListPageProps {
  params: Promise<{
    boardType: string;
  }>;
}

export default async function CommunityPage({ params }: ListPageProps) {
  const { boardType } = await params;
  const res = await getPosts(boardType);

  return (
    <>
      <ul className="mb-25">
        {/* 공지 부분은 하드코딩 */}

        {boardType === 'notice' &&
          (res.ok ? (
            res.item.map((post, i) => <NoticeList key={i} post={post} boardType={boardType} />)
          ) : (
            <p>{res.message}</p>
          ))}
        {boardType === 'event' &&
          (res.ok ? (
            res.item.map((post, i) => <EventList key={i} post={post} boardType={boardType} />)
          ) : (
            <p>{res.message}</p>
          ))}
      </ul>
    </>
  );
}
