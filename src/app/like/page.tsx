// TODO 나중에 로그인 정보가 들어오면 로그인 확인 페이지로 변경해야함.
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
