import MypageMain from '@/app/my-page/MypageMain';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지 - Twogether',
  openGraph: {
    title: '마이페이지 - Twogether',
    description: '마이페이지',
    url: '/my-page',
  },
};

function MyPage() {
  return (
    <>
      <main className="mx-4">
        <MypageMain />
      </main>
    </>
  );
}

export default MyPage;
