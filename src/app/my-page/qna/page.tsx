import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Judson } from 'next/font/google';
import Link from 'next/link';

const posts = [
  {
    id: '1',
    type: 'qna',
    name: '나문희',
    title: '문의 드립니다.',
    content: '언제 배송돼요???????????????',
    createdAt: '25.08.01',
  },
];

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export function generateMetadata() {
  return {
    title: `Q&A - Twogether`,
    description: `Q&A 게시판입니다.`,
    openGraph: {
      title: `Q&A - Twogether`,
      description: `Q&A 게시판입니다.`,
      url: `/my-page/qna`,
    },
  };
}

export default function QnaList() {
  return (
    <>
      <h2 className={`${JudsonFont.className} text-2xl text-center`}>Q&A</h2>
      {/* 공지 부분은 하드코딩 */}
      <ul>
        <li className="border-b-1 border-b-gray-250">
          <div className="flex gap-7 my-4">
            <span>공지</span>
            <Link href={`/community/notice/1`}>
              <span className="font-bold">투게더 교환 및 반품 안내</span>
            </Link>
          </div>
          <div className="flex gap-4 text-sm">
            <span>투게더</span>
            <span>25.08.01</span>
          </div>
        </li>
        <li className="border-b-1 border-b-gray-250">
          <div className="flex gap-7 my-4">
            <span>공지</span>
            <Link href={`/community/notice/2`}>
              <span className="font-bold">배송 안내</span>
            </Link>
          </div>
          <div className="flex gap-4 text-sm">
            <span>투게더</span>
            <span>25.08.01</span>
          </div>
        </li>
      </ul>
      <ul>
        {/* 게시판 목록 */}
        {posts.map((post) => (
          <li key={post.id} className="border-b-1 border-b-gray-250">
            <div className="flex gap-7 my-4">
              <span>{post.id}</span>
              <Link href={`/my-page/qna/${post.id}`}>
                <span>{post.title}</span>
              </Link>
            </div>
            <div className="flex gap-4 text-sm">
              <span>{post.name}</span>
              <span>{post.createdAt}</span>
              <span>조회 0</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-right mt-4">
        <Link href="/my-page/qna/new">
          <Button shape="square">작성</Button>
        </Link>
      </div>
      <div className="mt-40">
        <Input id="search" label="검색" search={true} />
      </div>
    </>
  );
}
