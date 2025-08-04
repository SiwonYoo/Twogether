'use client';

import LikeButton from '@/components/product/LikeButton';
import { GetLikeListItem } from '@/data/functions/like';
import { LikeItem, Product, User } from '@/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LikeButtonProps {
  data?: Product;
  id?: number; // 상품 ID
  user: User;
}

export default function LikePages({ id, data, user }: LikeButtonProps) {
  const [like, setLike] = useState<LikeItem | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = user.token?.accessToken;

    if (!token) {
      return;
    }

    async function Likes() {
      const res = await GetLikeListItem(Number(id), String(token));

      try {
        if (res.ok === 0) {
          return null;
        }
        if (res.ok === 1) {
          setLike(res.item);
          router.refresh();
        }
      } catch (e) {
        console.log('사용자가 로그인되지 않았습니다.');
        setLike(null);
      }
    }

    const likerefresh = setInterval(() => {
      Likes();
    }, 1000 * 5);

    return () => {
      clearInterval(likerefresh);
    };
  }, [like?._id]);

  console.log('삭제 id', like?._id);

  return (
    <>
      <LikeButton data={data} id={id} productLikeId={Number(like?._id)} />
    </>
  );
}
