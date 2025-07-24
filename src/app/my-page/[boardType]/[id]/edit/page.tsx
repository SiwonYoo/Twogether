import QnaEditRegist from '@/app/my-page/[boardType]/[id]/edit/RegistForm';
import { getPost } from '@/data/functions/post';

export function generateMetadata() {
  return {
    title: `Twogether`,
  };
}

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QnaEdit({ params }: EditPageProps) {
  const { id } = await params;

  const res = await getPost(Number(id));

  return <>{res.ok === 0 ? <p>{res.message}</p> : <QnaEditRegist post={res.item} />}</>;
}
