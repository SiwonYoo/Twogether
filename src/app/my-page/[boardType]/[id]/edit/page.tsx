import QnaEditRegist from '@/app/my-page/[boardType]/[id]/edit/RegistForm';
import { getPost } from '@/data/functions/post';

export async function generateMetadata({ params }: EditPageProps) {
  const { boardType } = await params;
  return {
    title: `${boardType} - Twogether`,
  };
}

interface EditPageProps {
  params: Promise<{
    boardType: string;
    id: string;
  }>;
}

export default async function QnaEdit({ params }: EditPageProps) {
  const { id } = await params;

  const res = await getPost(Number(id));

  return <>{res.ok === 0 ? <p>{res.message}</p> : <QnaEditRegist post={res.item} />}</>;
}
