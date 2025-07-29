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
        return (
          <div className="flex justify-center items-center flex-col bg-(--color-gray-150) p-6 rounded-2xl">
            <h2 className="font-bold text-2xl">고객님 죄송합니다</h2>
            <p className="mt-2">서버 이슈로 인해 찜한 상품을 불러오지 못했습니다</p>
            <p className="mt-2">조금 있다가 시도해주시길 바랍니다.</p>
            <p className="mt-2">Twogether 이용에 불편을 드려 죄송합니다.</p>
            <LinkButton href="/">홈 화면 바로가기</LinkButton>
          </div>
        );
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
  }, [user]);

  return (
    <main className="mx-4">
      <h2 className={`font-bold text-4xl text-center ${JudsonFont.className}`}>LIKE</h2>
      <ul className="grid grid-cols-2 gap-4 my-6">
        {likes.map((item) => (
          <ProductCardItem key={item._id} productType={item.product.extra.category} data={[item.product]} />
        ))}
      </ul>
    </main>
  );
}
