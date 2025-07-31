import ReviewList from '@/app/my-page/review/ReviewList';
import { Metadata } from 'next';
import { Judson } from 'next/font/google';

export const metadata: Metadata = {
  title: '내가 쓴 리뷰 - Twogether',
  description: 'Twogether의 내가 쓴 리뷰 페이지입니다.',

  openGraph: {
    title: '내가 쓴 리뷰 - Twogether',
    description: 'Twogether의 내가 쓴 리뷰 페이지입니다.',
    url: '/my-page/review',
  },
};

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

async function Review() {
  return (
    <>
      <main className="px-4 mb-20">
        <h2 className={`mb-6 text-2xl text-center ${JudsonFont.className}`}>MY REVIEWS</h2>
        <ReviewList />
      </main>
    </>
  );
}

export default Review;
