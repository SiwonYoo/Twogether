import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Judson } from 'next/font/google';
import Button from '@/components/common/Button';
import { getPost } from '@/data/functions/post';
import DeleteForm from '@/app/my-page/[boardType]/[id]/DeleteForm';

interface InfoPageProps {
  params: {
    boardType: string;
    id: string;
  };
}

export async function generateMetadata({ params }: InfoPageProps) {
  const { boardType, id } = await params;
  return {
    title: boardType.toUpperCase() + '- Twogether',
    description: boardType.toUpperCase() + '게시판입니다.',
    openGraph: {
      title: boardType.toUpperCase() + '- Twogether',
      description: boardType.toUpperCase() + '게시판입니다.',
      url: `/my-page/qna/${boardType}/${id}`,
    },
  };
}

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export default async function QnaInfoPage({ params }: InfoPageProps) {
  const { boardType, id } = await params;
  const res = await getPost(Number(id));
  console.log('delete', res);
  return (
    <>
      <main className="mb-25">
        <div className="flex justify-center items-center relative">
          <Link href={`/my-page/qna`}>
            <ChevronLeft className="absolute left-4 bottom-2 cursor-pointer" />
          </Link>
          <h2 className={`${JudsonFont.className} text-2xl`}>Q&A</h2>
        </div>

        {res.ok === 0 ? (
          <p>{res.message}</p>
        ) : (
          <>
            <h3 className="my-4 border-b-1 border-gray-250">{res.item?.title}</h3>
            <div className="flex justify-between gap-8 text-gray-250 mb-6">
              <p>{res.item?.user.name}</p>
              <p className="mr-auto">조회 {res.item?.views}</p>
              <p>{res.item.createdAt}</p>
            </div>
            <p className="py-10 border-b-1 border-gray-150">{res.item?.content}</p>
            <div className="flex justify-end gap-4 my-3">
              <Link href={`/my-page/${boardType}/${res.item?._id}/edit`}>
                <Button shape="square">수정</Button>
              </Link>
              <DeleteForm boardType={boardType} id={id} />
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
          </>
        )}
      </main>
    </>
  );
}
