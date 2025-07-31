'use client';

import { useState, useEffect } from 'react';
import LikeAddButton from '@/components/product/LikeAddButton';
import LikeDelButton from '@/components/product/LikeDelButton';
import { OrderProduct } from '@/types';
import useUserStore from '@/stores/useUserStore';
import { GetLikeList } from '@/data/functions/like';

interface LikeButtonProps {
  data?: OrderProduct;
  id?: number; // 상품 ID
  Itemid?: number; // 찜 목록과 비교할 상품 ID
}

/**
 * 상품의 찜 상태를 확인하고, 해당 상태에 따라 찜 추가/삭제 버튼을 렌더링하는 컴포넌트입니다.
 *
 * - 사용자의 토큰을 기반으로 해당 상품이 찜 목록에 존재하는지 확인합니다.
 * - 찜 여부에 따라 `LikeAddButton` 또는 `LikeDelButton` 컴포넌트를 렌더링합니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {OrderProduct} [props.data] - 현재 상품 정보 객체 (찜 상태 비교에 사용)
 * @param {number} [props.id] - 상품 ID (찜 추가 요청 시 사용)
 * @param {number} [props.Itemid] - 찜 삭제 요청 시 사용될 ID
 *
 * @returns {JSX.Element | undefined} 찜 버튼 렌더링 요소 또는 undefined (data가 없을 경우)
 */

export default function LikeButton({ id, Itemid, data }: LikeButtonProps) {
  const [useData, setUseData] = useState(false); // 찜 여부 상태
  const { user } = useUserStore();

  useEffect(() => {
    async function fetchLikes() {
      const token = user?.token?.accessToken;
      if (!token) {
        return console.error('토큰 없음');
      }

      try {
        const res = await GetLikeList(String(token));
        if (res.ok === 1 && res.item) {
          const isLiked = res.item.filter((likeItem) => {
            return likeItem.product._id === data?._id;
          });
          if (isLiked.length === 0) {
            setUseData(useData);
          } else if (isLiked.length > 0) {
            setUseData(!useData);
          }
        }
        return res;
      } catch (error) {
        console.error('fetchLikes 에러:', error);
      }
    }

    if (user) {
      fetchLikes();
    }
  }, []);

  if (!data) {
    return;
  }

  return (
    <>
      {/* 찜 상태에 따른 렌더링 */}
      {useData ? (
        <>
          <LikeDelButton Itemid={Number(Itemid)} />
        </>
      ) : (
        <>
          <LikeAddButton id={Number(id)} />
        </>
      )}
    </>
  );
}
