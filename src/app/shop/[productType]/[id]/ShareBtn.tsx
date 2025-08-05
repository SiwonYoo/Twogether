'use client';

import Button from '@/components/common/Button';
import { Product } from '@/types';
import { Share } from 'lucide-react';
import React, { useEffect } from 'react';

interface ShareBtn {
  data: Product;
}

export default function KakaoShareButton({ data }: ShareBtn) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: 'text',
      text: data.name,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    });
  };

  return (
    <>
      <Button className="absolute right-4 bottom-4 rounded-full bg-(--color-gray-250) p-4" onClick={handleShare}>
        <Share />
      </Button>
    </>
  );
}
