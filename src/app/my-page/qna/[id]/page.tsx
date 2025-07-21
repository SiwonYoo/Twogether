import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Judson } from 'next/font/google';
import Button from '@/components/common/Button';

export function generateMetadata() {
  return {
    title: `${posts.title} - Twogether`,
    description: `${posts.title}`,
    openGraph: {
      title: `${posts.title} - Twogether`,
      description: `${posts.title}`,
      url: `/my-page/qna/${posts.id}`,
    },
  };
}

const posts = {
  id: '1',
  type: 'qna',
  name: '나문희',
  title: '문의 드립니다.',
  content: '언제 배송돼요???????????????',
  createdAt: '25.08.01',
};

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export default function QnaInfoPage() {
  return (
    <>
      <main className="mb-25">
        <div className="flex justify-center items-center relative">
          <Link href={`/my-page/qna`}>
            <ChevronLeft className="absolute left-4 bottom-2 cursor-pointer" />
          </Link>
          <h2 className={`${JudsonFont.className} text-2xl`}>Q&A</h2>
        </div>
        <h3 className="my-4 border-b-1 border-gray-250">{posts.title}</h3>
        <div className="flex justify-between gap-8 text-gray-250 mb-6">
          <p>{posts.name}</p>
          <p className="mr-auto">조회 0</p>
          <p>{posts.createdAt}</p>
        </div>
        <p className="py-10 border-b-1 border-gray-150">{posts.content}</p>
        <div className="flex justify-end gap-4 my-3">
          <Link href={`/my-page/qna/${posts.id}/edit`}>
            <Button shape="square">수정</Button>
          </Link>
          <Button shape="square">삭제</Button>
        </div>
        <p className="text-right">* 답변이 달린 후에는 수정이 불가합니다.</p>
        <div className="h-50 p-1 bg-gray-150">
          <p>문의 답변 내용</p>
        </div>
        <div className="mt-40">
          <Link href={`/my-page/qna`}>
            <Button shape="square" size="lg">
              목록
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
