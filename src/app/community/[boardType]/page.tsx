import EventList from '@/app/community/EventList';
import NoticeList from '@/app/community/NoticeList';
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

  return (
    <>
      {boardType === 'event' && <EventList />}
      {boardType === 'notice' && <NoticeList />}
    </>
  );
}
