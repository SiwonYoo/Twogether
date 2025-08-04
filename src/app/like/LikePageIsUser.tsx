'use client';

import ProductCardItem from '@/components/product/ProductCardItem';
import { GetLikeList } from '@/data/functions/like';
import useUserStore from '@/stores/useUserStore';
import { LikeItem } from '@/types';
import React, { useEffect, useState } from 'react';
import { Judson } from 'next/font/google';
import LinkButton from '@/components/common/LinkButton';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function LikePageIsUser() {
  const user = useUserStore((s) => s.user);
  const [likes, setLikes] = useState<LikeItem[]>([]);

  useEffect(() => {
    async function fetchLikes() {
      // 토큰이 없으면 함수 종료
      if (!user?.token?.accessToken) {
        return null;
      }
      const token = user.token.accessToken;
      try {
        const res = await GetLikeList(token);
        if (res.ok === 1) {
          setLikes(res.item);
        }
        return res;
      } catch (error) {
        console.error('fetchLikes 에러:', error);
      }
    }

    // user가 존재하고 token이 있을 때만 호출
    if (user && user.token && user.token.accessToken) {
      fetchLikes();
    } else {
      console.log('사용자가 로그인되지 않았습니다.');
    }
    const likerefresh = setInterval(() => {
      fetchLikes();
    }, 1000 * 5);

    return () => {
      clearInterval(likerefresh);
    };
  }, [user]);

  // 찜 상품이 있는지 확인
  const hasAnyProduct = likes.filter((item) => !!item.product);

  // 찜 상품이 없을 경우
  if (hasAnyProduct.length === 0) {
    return (
      <main className="mx-4">
        <div className="font-bold text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4">
          <p className="text-3xl mb-4">고객님, 찜한 상품이 없습니다!</p>
          <p className="text-gray-500">관심 있는 상품을 찜하면 이곳에 보여드릴게요.</p>
          <p className="text-gray-500 my-2">마음에 드는 상품을 발견하셨다면 하트를 눌러 찜해보세요.</p>
          <p className="text-gray-500">찜한 상품을 한눈에 모아보고 싶다면, 지금 바로 다양한 상품을 둘러보세요.</p>
          <p className="text-gray-500 mb-4 mt-2">고객님의 취향에 꼭 맞는 상품을 준비해두고 기다리고 있답니다.</p>
          <LinkButton href="shop/shortSleeve">상품 보러가기</LinkButton>
        </div>
      </main>
    );
  }

  if (!user?.token?.accessToken) {
    return (
      <div className="flex justify-center items-center flex-col bg-(--color-gray-150) p-6 rounded-2xl">
        <h2 className="font-bold text-2xl">고객님 죄송합니다</h2>
        <p className="mt-2">서버 이슈로 인해 찜한 상품을 불러오지 못했습니다</p>
        <p className="mt-2">조금 있다가 시도해주시길 바랍니다.</p>
        <p className="mt-2">Twogether 이슈에 불편을 드려 죄송합니다.</p>
        <LinkButton href="/">홈 화면 바로가기</LinkButton>
      </div>
    );
  }

  // 찜 상품이 있을때
  return (
    <main className="mx-4">
      <h2 className={`font-bold text-4xl text-center ${JudsonFont.className}`}>LIKE</h2>
      <ul className="grid grid-cols-2 gap-4 my-6">
        {likes.map((item) => (
          <ProductCardItem
            key={item._id}
            productType={item.product.extra.category}
            productLikeId={Number(item._id)}
            data={[item.product]}
          />
        ))}
      </ul>
    </main>
  );
}
