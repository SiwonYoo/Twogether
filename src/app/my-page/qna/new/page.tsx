import QnaRegist from '@/app/my-page/qna/new/RegistForm';

export function generateMetadata() {
  return {
    title: `Q&A 등록 - Twogether`,
    description: `Q&A 게시판 등록`,
  };
}

export default function QnaNew() {
  return <QnaRegist />;
}
