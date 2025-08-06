import CommunityPage from '@/app/community/CommunityPage';
import { Metadata } from 'next';

export async function generateMetadata({ params }: ListPageProps): Promise<Metadata> {
  const { boardType } = await params;
  return {
    title: `${boardType} - Twogether`,
    description: `${boardType} 게시판입니다.`,
    openGraph: {
      title: `${boardType} - Twogether`,
      description: `${boardType} 게시판입니다.`,
      url: `/community/${boardType}`,
    },
  };
}

export interface ListPageProps {
  params: Promise<{
    boardType: string;
  }>;
}

export default async function CommunityPageWrapper({ params }: ListPageProps) {
  const { boardType } = await params;
  return <CommunityPage boardType={boardType} />;
}
