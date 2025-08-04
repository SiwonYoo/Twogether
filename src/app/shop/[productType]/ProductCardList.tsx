'use client';
import ProductCardItemLayout from '@/app/shop/[productType]/ProductCardItemLayout';
import { GetLikeList } from '@/data/functions/like';
import useUserStore from '@/stores/useUserStore';
import { LikeItem, Product } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductCardItemLayoutProps {
  productType: string;
  data: Product[];
}

export default function ProductCardList({ productType, data }: ProductCardItemLayoutProps) {
  const { user } = useUserStore();
  const [likes, setLikes] = useState<LikeItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchLikes() {
      const token = user?.token?.accessToken;
      if (!user && !token) {
        return null;
      }

      try {
        const res = await GetLikeList(String(token));
        if (res.ok === 1) {
          router.refresh();
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

    const likerefresh = setInterval(() => {
      fetchLikes();
    }, 1000 * 5);

    return () => {
      clearInterval(likerefresh);
    };
  }, [user?.token?.accessToken]);

  // product._id 기준으로 like 매핑 (찜돼 있으면 likeId, 아니면 undefined)
  const likeMap = new Map<string | number, number>();
  likes.forEach((like) => {
    if (like.product && like.product._id != null) {
      likeMap.set(like.product._id, Number(like._id));
    }
  });

  console.log(likes);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 my-6">
        {data.map((product) => {
          const likeId = product._id != null ? likeMap.get(product._id) : undefined;
          return (
            <ProductCardItemLayout
              key={product._id ?? `prod-${Math.random()}`}
              productType={productType}
              data={[product]}
              likeId={Number(likeId)}
            />
          );
        })}
      </ul>
    </>
  );
}
