import EventList from '@/app/community/EventList';
import NoticeList from '@/app/community/NoticeList';
import SearchForm from '@/components/common/SearchForm';
import { getPosts } from '@/data/functions/post';
import { Metadata } from 'next';

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

  const isNoticeBoard = boardType === 'notice';
  const isEventBoard = boardType === 'event';

  return (
    <>
      <ul className="mb-25">
        {isNoticeBoard &&
          (res.ok ? (
            res.item
              .slice(-2)
              .reverse()
              .map((post, i) => <NoticeList key={i} post={post} boardType={boardType} isNotice />)
          ) : (
            <p>{res.message}</p>
          ))}

        {isNoticeBoard &&
          (res.ok ? (
            res.item.map((post, i) => <NoticeList key={i} post={post} boardType={boardType} isNotice={false} />)
          ) : (
            <p>{res.message}</p>
          ))}

        {isEventBoard &&
          (res.ok ? (
            res.item.map((post, i) => <EventList key={i} post={post} boardType={boardType} />)
          ) : (
            <p>{res.message}</p>
          ))}
      </ul>
      <div className="mb-20">
        <SearchForm />
      </div>
    </>
  );
}
