import Button from '@/components/common/Button';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import { Judson } from 'next/font/google';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

const noticeList = [
  // 고정 공지사항
  {
    id: '1',
    type: 'notice',
    title: '투게더 교환 및 반품 안내',
    content:
      '안녕하세요. 투게더 입니다. 내용 테스트를 위해 지금 계속 길게 길게 길게 길게 길게 길게 길게 치는 중입니다.',
    name: '투게더',
    date: '25.08.01',
  },
  {
    id: '2',
    type: 'notice',
    title: '배송 안내',
    content: '안녕하세요. 투게더 입니다.',
    name: '투게더',
    date: '25.08.01',
  },
  { id: '3', type: 'notice', title: '게시물 1', content: '내용없음', name: '투게더', date: '25.08.01' },
  { id: '4', type: 'notice', title: '게시물 2', content: '내용없음', name: '투게더', date: '25.08.01' },
  { id: '5', type: 'notice', title: '게시물 3', content: '내용없음', name: '투게더', date: '25.08.01' },
  { id: '6', type: 'notice', title: '게시물 4', content: '내용없음', name: '투게더', date: '25.08.01' },
  { id: '1', type: 'event', title: '이벤트 카드1', content: '내용없음', name: '투게더', date: '25.08.01' },
  { id: '2', type: 'event', title: '이벤트 카드2', content: '내용없음', name: '투게더', date: '25.08.01' },
  { id: '3', type: 'event', title: '이벤트 카드3', content: '내용없음', name: '투게더', date: '25.08.01' },
  { id: '4', type: 'event', title: '이벤트 카드4', content: '내용없음', name: '투게더', date: '25.08.01' },
];

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
    id: string;
  }>;
}

export default async function BoardInfoPage({ params }: ListPageProps) {
  const { boardType, id } = await params;
  const boardTypeStr = boardType.toUpperCase();

  // 더미 데이터 id값과 boardType으로 가져오기
  const post = noticeList.find((item) => id === item.id && boardType === item.type);
  console.log(post);
  if (!post) return <div>게시물을 찾을 수 없습니다</div>;

  return (
    <>
      <main className="mb-25">
        <div className="flex justify-center items-center relative">
          <Link href={`/community/${boardType}`}>
            <ChevronLeft className="absolute left-4 bottom-2 cursor-pointer" />
          </Link>
          <h2 className={`${JudsonFont.className} text-2xl`}>{boardTypeStr}</h2>
        </div>
        <h3 className="my-4 border-b-1 border-gray-250">{post.title}</h3>
        <div className="flex justify-between gap-8 text-gray-250 mb-6">
          <p>{post.name}</p>
          {post.type !== 'fixnotice' && <p className="mr-auto">조회 0</p>}
          <p>{post.date}</p>
        </div>
        <p>{post.content}</p>
      </main>
      <Link href={`/community/${boardType}`}>
        <Button shape="square" size="lg">
          목록
        </Button>
      </Link>
    </>
  );
}
