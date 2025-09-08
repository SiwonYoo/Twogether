'use client';

import React, { ReactHTMLElement, useCallback, useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { useProductLike } from '@/stores/useProductLike';
import { Product } from '@/types';
import useUserStore from '@/stores/useUserStore';
import { redirect } from 'next/navigation';

interface LikeToggleButtonProps {
  data?: Product;
}

export default function LikeToggleButton({ data }: LikeToggleButtonProps) {
  const productId = Number(data?._id);
  const { isLiked, like, unlike, fetchLikes, currentLike } = useProductLike(productId);
  const [isPending, setIsPending] = useState(false);
  const { user } = useUserStore();
  const token = user?.token?.accessToken;
  const isProcessingRef = useRef(false);
  useEffect(() => {
    if (token) {
      fetchLikes();
    }
  }, [token]);

  const handleToggle = useCallback(async () => {
    if (!token) {
      if (confirm('로그인이 필요한 서비스입니다 로그인 하시겠습니까?')) {
        redirect('/login');
      }
      return;
    }

    isProcessingRef.current = true;
    setIsPending(true);
    try {
      if (isLiked && currentLike?._id) {
        await unlike(currentLike._id);
      } else {
        await like();
      }
      fetchLikes();
    } catch (error) {
    } finally {
      setIsPending(false);
      isProcessingRef.current = false;
    }
  }, [token, isPending, isLiked, currentLike, like, unlike, productId]);

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      aria-label={!token ? (isLiked ? '찜 해제' : '찜 추가') : '로그인이 필요한 서비스입니다. 로그인해주세요'}
      aria-pressed={isLiked}
    >
      <Heart fill={isLiked ? '#F44336' : 'none'} stroke={isLiked ? 'none' : '#F44336'} />
    </button>
  );
}
