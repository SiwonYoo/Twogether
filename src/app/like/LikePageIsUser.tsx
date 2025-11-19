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
  weight: ['700'],
});

export default function LikePageIsUser() {
  const user = useUserStore((s) => s.user);
  const [likes, setLikes] = useState<LikeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

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
      } finally {
        setLoading(false);
      }
    }

    // user가 존재하고 token이 있을 때만 호출
    if (user && user.token && user.token.accessToken) {
      fetchLikes();
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

  return (
    <main className="mx-4">
      <h2 className={`mb-6 text-2xl text-center ${JudsonFont.className}`}>LIKES</h2>

      {loading ? (
        <p className="text-center">로딩 중..</p>
      ) : hasAnyProduct.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 my-6">
          {likes.map((item) => (
            <ProductCardItem key={item._id} productType={item.product.extra.category} data={[item.product]} />
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 rounded-2xl my-6 p-4">
          <p className="mb-4">찜한 상품이 없습니다!</p>
          <p className="text-gray-500 mt-2">지금 바로 다양한 상품을 둘러보고,</p>
          <p className="text-gray-500 mb-4">마음에 드는 상품을 찜해보세요.</p>
          <LinkButton href="/shop">상품 보러가기</LinkButton>
        </div>
      )}
    </main>
  );
}
