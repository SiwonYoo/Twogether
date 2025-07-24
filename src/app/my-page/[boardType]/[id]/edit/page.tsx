import QnaEditRegist from '@/app/my-page/[boardType]/[id]/edit/RegistForm';

export function generateMetadata() {
  return {
    title: `Twogether`,
  };
}

export default function QnaEdit() {
  return <QnaEditRegist />;
}
