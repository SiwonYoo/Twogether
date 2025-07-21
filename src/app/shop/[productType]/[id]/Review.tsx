'use client';

import ReviewItem, { ReviewItemProps } from '@/app/my-page/review/ReviewItem';
import ReviewItme from '@/app/shop/[productType]/[id]/ReviewCom';
import { Star } from 'lucide-react';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import { useState } from 'react';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export default function Review() {
  const [toggle, setToggle] = useState(true);
  const [likeToggle, setLikeToggle] = useState(false);

  // 댓글 열고 닫기 토글
  const openToggle = () => {
    setToggle(!toggle);
    console.log('바뀜 확인');
  };

  // 도움 돼요 토글 버튼
  const likeToggleBtn = () => {
    setLikeToggle(!likeToggle);
    console.log('바뀜 확인');
  };

  const data: ReviewItemProps[] = [
    {
      _id: 1,
      userName: '구성연',
      content: '너무 이뻐요',
      rating: 5,
      height: '150~160',
      weight: '50~60',
      size: 'FREE',
      createdAt: '25.07.09 13:15',
      image: '/images/products/short-sleeve/01/model-1.jpg',
      comment: [
        {
          _id: 1,
          user: '홍길동',
          content: '크기는 적당한가요?',
          createdAt: '25.07.03',
        },
        {
          _id: 2,
          user: '홍길동',
          content: '색은 어떤가요?',
          createdAt: '25.07.03',
        },
      ],
    },
    {
      _id: 2,
      userName: '홍길동',
      content: '색상이랑 두께, 재질 모두 마음에 들어요. 키 168 기준 길이도 딱 맞아요. 고민중이면 사보시는걸 추천드려요',
      rating: 1,
      height: '150~160',
      weight: '50~60',
      size: 'FREE',
      createdAt: '25.07.09 13:15',
      image: '/images/products/short-sleeve/01/model-1.jpg',
      comment: [
        {
          _id: 1,
          user: '홍길동',
          content: '크기는 적당한가요?',
          createdAt: '25.07.03',
        },
        {
          _id: 2,
          user: '홍길동',
          content: '색은 어떤가요?',
          createdAt: '25.07.03',
        },
      ],
    },
    {
      _id: 3,
      userName: '홍길동',
      content: '색상이랑 두께, 재질 모두 마음에 들어요. 키 168 기준 길이도 딱 맞아요. 고민중이면 사보시는걸 추천드려요',
      rating: 4,
      height: '150~160',
      weight: '50~60',
      size: 'M',
      createdAt: '25.07.09 13:15',
      image: '/images/products/short-sleeve/01/model-1.jpg',
      comment: [
        {
          _id: 1,
          user: '홍길동',
          content: '크기는 적당한가요?',
          createdAt: '25.07.03',
        },
        {
          _id: 2,
          user: '홍길동',
          content: '색은 어떤가요?',
          createdAt: '25.07.03',
        },
      ],
    },
    {
      _id: 4,
      userName: '홍길동',
      content: '색상이랑 두께, 재질 모두 마음에 들어요. 키 168 기준 길이도 딱 맞아요. 고민중이면 사보시는걸 추천드려요',
      rating: 4,
      height: '150~160',
      weight: '50~60',
      size: 'S',
      createdAt: '25.07.09 13:15',
      image: '/images/products/short-sleeve/01/model-1.jpg',
      comment: [
        {
          _id: 1,
          user: '홍길동',
          content: '크기는 적당한가요?',
          createdAt: '25.07.03',
        },
        {
          _id: 2,
          user: '홍길동',
          content: '색은 어떤가요?',
          createdAt: '25.07.03',
        },
      ],
    },
  ];

  const starAvg = [
    { _id: 1, value: '별로에요' },
    { _id: 2, value: '그냥 그래요' },
    { _id: 3, value: '보통이에요' },
    { _id: 4, value: '맘에 들어요' },
    { _id: 5, value: '아주좋아요' },
  ];

  // 별점 카운트
  const starCounts = [1, 2, 3, 4, 5].reduce((acc, val) => {
    acc[val] = data.filter((item) => Number(item.rating) === val).length;
    return acc;
  }, {} as Record<number, number>);

  // 평균 별점
  const avgStar = data.reduce((sum, item) => sum + Number(item.rating), 0) / data.length;

  return (
    <>
      <h2 className={`${JudsonFont.className} text-2xl my-4`}>Review {`(${data.length})`}</h2>

      {/* 별점 평균 그래프 시작 */}
      <div className="flex justify-center items-center gap-10 my-6">
        {/* 평균 별점 */}
        <div className="flex items-center gap-2">
          <Star fill="var(--color-primary)" />
          <p className={`${JudsonFont.className} font-bold text-5xl`}>{avgStar.toFixed(1)}</p>
        </div>

        {/* 별점별 개수 */}
        <ul>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = starCounts[star] || 0;
            const percentage = data.length ? (count / data.length) * 100 : 0;
            const label = starAvg.find((s) => s._id === star)?.value || '';
            return (
              <li key={star} className="flex items-center gap-1 my-1">
                <span className="w-24">{label}</span>
                <div className="relative flex-1 w-[6.25rem] w-min-[6.25rem] w-max-[10.625rem] h-2 bg-(--color-gray-250) rounded">
                  <span
                    className={`${JudsonFont.className} absolute top-0 left-0 h-2 bg-primary rounded`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={` ${JudsonFont.className} text-right`}>{count}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {/* 별점 평균 그래프 종료 */}

      {/* 상품 리뷰 시작 */}
      <ul className="flex flex-col items-center gap-4">
        {data.map((itme) => {
          return (
            <li key={itme._id} className="w-full">
              <ReviewItem
                _id={itme._id}
                userName={itme.userName}
                rating={itme.rating}
                content={itme.content}
                createdAt={itme.createdAt}
                height={itme.height}
                weight={itme.weight}
                size={itme.size}
                comment={itme.comment}
                image={itme.image}
              />
            </li>
          );
        })}
      </ul>
      {/* 상품 리뷰 종료 */}
    </>
  );
}
