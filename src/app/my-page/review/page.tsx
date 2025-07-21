import ReviewItem, { ReviewItemProps } from '@/app/my-page/review/ReviewItem';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내가 쓴 리뷰 - Twogether',
  openGraph: {
    title: '내가 쓴 리뷰 - Twogether',
    description: '내가 쓴 리뷰',
    url: '/my-page/review',
  },
};

/* dummy data */
const dummyData: ReviewItemProps[] = [
  {
    _id: 1,
    userName: '박**',
    rating: 4,
    content: '너무 이뻐요',
    createdAt: '25.08.15',
    height: '151~160',
    weight: '51~60',
    size: 'FREE',
    image: '/images/products/short-sleeve/01/review-1.png',
    comment: [
      {
        _id: 1,
        user: '김**',
        content: '사진이 너무 멋져요',
        createdAt: '25.09.02',
      },
      {
        _id: 2,
        user: '이**',
        content: '같이 착용하신 바지 정보가 궁금해요!',
        createdAt: '25.09.22',
      },
    ],
  },
  {
    _id: 2,
    userName: '박**',
    rating: 5,
    content:
      'AI 코딩 도구를 활용하면 코드 생성 및 자동화, 개발 워크플로우와의 통합 등이 가능하며 기존 개발 환경 대비 생산성을 높일 수 있습니다. 그러나 개발자를 꿈꾸며 학습을하는 예비 개발자에게 AI 코딩 도구는 양날의 검이 될 수 있습니다. AI 코딩 도구에만 의존하는 주니어 개발자는 경쟁력을 갖출 수 없기 때문입니다. 오히려 더 깊이 있게 언어를 학습하고 좋은 질문을 할 수 있도록 문해력(Literacy)을 기르는 것이 필요합니다. 다만 AI 도구를 완전히 배제하는 것이 아닌 학습을 위한 파트너로서 활용할 것을 추천합니다.',
    createdAt: '25.08.08',
    height: '171~180',
    weight: '71~80',
    size: 'L',
    image: '/images/products/short-sleeve/02/review-1.png',
  },
];

function Review() {
  return (
    <>
      <main className="px-4">
        <div className="flex flex-col gap-4">
          {dummyData.map((item) => (
            <ReviewItem {...item} key={item._id}></ReviewItem>
          ))}
        </div>
      </main>
    </>
  );
}

export default Review;
