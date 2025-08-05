'use client';

import { useCallback } from 'react';
import useLikeStore from '@/stores/useLikeStore';
import useUserStore from '@/stores/useUserStore';
import { GetLikeList } from '@/data/functions/like';
import { DeleteLikeList, PostLikeList } from '@/data/actions/like';

export function useProductLike(productId: number) {
  const { user } = useUserStore();
  const token = user?.token?.accessToken;
  const { likes, setLikes, addLike, removeLike } = useLikeStore();

  const isLiked = useLikeStore((s) => s.isLiked(productId));

  // fetch 전체 찜 목록
  const fetchLikes = useCallback(async () => {
    if (!token) {
      return null;
    }
    try {
      const res = await GetLikeList(String(token));
      if (res.ok === 1 && Array.isArray(res.item)) {
        setLikes(res.item);
      }
    } catch (e) {
      console.error('fetchLikes 에러:', e);
    }
  }, [token, setLikes]);

  // 찜 추가 (API + 로컬)
  const like = useCallback(async () => {
    if (!token || !productId) return;

    // 이미 찜한 상태면 추가하지 않음
    if (isLiked) return;

    try {
      const res = await PostLikeList(Number(productId), String(token));
      if (res.ok === 1 && res.item && typeof res.item === 'object' && !Array.isArray(res.item)) {
        addLike(res.item);
      } else {
        // API 호출은 성공했지만 예상과 다른 응답일 때 전체 목록 다시 가져오기
        await fetchLikes();
      }
    } catch (error) {
      console.log('찜 추가 실패:', error);
      // 실패 시 전체 목록 다시 가져와서 동기화
      await fetchLikes();
    }
  }, [token, productId, addLike, fetchLikes, isLiked]);

  // 찜 삭제 (API + 로컬)
  const unlike = useCallback(
    async (likeId: number | string) => {
      if (!token || !likeId) return;

      try {
        const res = await DeleteLikeList(Number(likeId), String(token));
        if (res.ok === 1) {
          removeLike(likeId);
        } else {
          console.log('찜 삭제 API 실패:', res);
          await fetchLikes();
        }
      } catch (error) {
        console.log('찜 삭제 실패:', error);
        await fetchLikes();
      }
    },
    [token, removeLike, fetchLikes]
  );

  // 현재 상품의 찜 정보 찾기
  const currentLike = likes.find((l) => String(l.product?._id) === String(productId));

  return {
    isLiked,
    likes,
    currentLike,
    fetchLikes,
    like,
    unlike,
  };
}
