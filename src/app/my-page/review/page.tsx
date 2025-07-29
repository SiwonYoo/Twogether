import ReviewList from '@/app/my-page/review/ReviewList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내가 쓴 리뷰 - Twogether',
  description: 'Twogether의 내가 쓴 리뷰 페이지입니다.',

  openGraph: {
    title: '내가 쓴 리뷰 - Twogether',
    description: 'Twogether의 내가 쓴 리뷰 페이지입니다.',
    url: '/my-page/review',
  },
};

async function Review() {
  return (
    <>
      <main className="px-4 mb-20">
        <ReviewList />
      </main>
    </>
  );
}

export default Review;
