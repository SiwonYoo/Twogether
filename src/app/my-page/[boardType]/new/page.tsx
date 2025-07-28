import QnaRegist from '@/app/my-page/[boardType]/new/RegistForm';

export function generateMetadata() {
  return {
    title: `Q&A 등록 - Twogether`,
    description: `Q&A 게시판 등록`,
  };
}

interface NewPageProps {
  params: Promise<{
    boardType: string;
  }>;
}

export default async function QnaNew({ params }: NewPageProps) {
  const { boardType } = await params;
  return <QnaRegist boardType={boardType} />;
}
