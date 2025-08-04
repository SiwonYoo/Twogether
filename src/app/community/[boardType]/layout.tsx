import Button from '@/components/common/Button';
import { Judson } from 'next/font/google';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export default async function BoardTypeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    boardType: string;
  }>;
}) {
  const { boardType } = await params;
  return (
    <>
      <main className="mx-4">
        {/* boardType이 'qna'가 아닐 때만 버튼 보여주기 */}
        {boardType !== 'qna' && (
          <div className="flex gap-2.5 justify-center pt-4 pb-15">
            <Link href="/community/notice">
              <Button bg={boardType === 'notice' ? 'primary' : 'light'} shape="square" lang="eng">
                NOTICE
              </Button>
            </Link>
            <Link href="/community/event">
              <Button bg={boardType === 'event' ? 'primary' : 'light'} shape="square" lang="eng">
                EVENT
              </Button>
            </Link>
          </div>
        )}
        {children}
      </main>
    </>
  );
}
