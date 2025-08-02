'use client';
import ProductCardItemLayout from '@/app/shop/[productType]/ProductCardItemLayout';
import { GetLikeList } from '@/data/functions/like';
import useUserStore from '@/stores/useUserStore';
import { LikeItem, Product } from '@/types';
import { useEffect, useState } from 'react';

interface ProductCardItemLayoutProps {
  productType: string;
  data: Product[];
}

export default function ProductCardList({ productType, data }: ProductCardItemLayoutProps) {
  const { user } = useUserStore();
  const [likes, setLikes] = useState<LikeItem[]>([]);
  useEffect(() => {
    async function fetchLikes() {
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

    if (user && user.token && user.token.accessToken) {
      fetchLikes();
    } else {
      console.log('사용자가 로그인되지 않았습니다.');
    }
  }, [user?.token?.accessToken]);

  // product._id 기준으로 like 매핑 (찜돼 있으면 likeId, 아니면 undefined)
  const likeMap = new Map<string | number, number>();
  likes.forEach((like) => {
    if (like.product && like.product._id != null) {
      likeMap.set(like.product._id, Number(like._id));
    }
  });

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 my-6">
        {data.map((product) => {
          const likeId = product._id != null ? likeMap.get(product._id) : undefined;
          return (
            <ProductCardItemLayout
              key={product._id ?? `prod-${Math.random()}`}
              productType={productType}
              data={[product]} // <-- 전체 배열이 아니라 단일 상품
              likeId={likeId != null ? Number(likeId) : Number()}
            />
          );
        })}
      </ul>
    </>
  );
}
