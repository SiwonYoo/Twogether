import LikePageIsUser from '@/app/like/LikePageIsUser';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '찜 - Twogether',
  openGraph: {
    title: '찜 - Twogether',
    description: '상품의 찜 페이지입니다.',
    url: '/like',
  },
};

export default function LikePage() {
  return (
    <>
      <LikePageIsUser />
    </>
  );
}
