'use client';

import Button from '@/components/common/Button';
import { Product } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { Share } from 'lucide-react';

interface ShareBtn {
  data: Product;
  productType: string;
  id: string;
}

declare global {
  interface Window {
    Kakao: any;
  }
}
export default function KakaoShareButton({ data, productType, id }: ShareBtn) {
  const [hover, setHover] = useState(false);

  const handleShare = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${data.name}`,
          description: `${data.content === undefined ? '버튼을 눌러 상품을 확인해주세요!' : data.content}`,
          imageUrl: '이미지 URL',
          link: {
            mobileWebUrl: `https://final-02-twogether.vercel.app/shop/${productType}/${id}`,
            webUrl: `https://final-02-twogether.vercel.app/shop/${productType}/${id}`,
          },
        },
        buttons: [
          {
            title: '상품 구매하러가기',
            link: {
              mobileWebUrl: `https://final-02-twogether.vercel.app/shop/${productType}/${id}`,
              webUrl: `https://final-02-twogether.vercel.app/shop/${productType}/${id}`,
            },
          },
        ],
      });
    }
  };

  return (
    <>
      <Button
        className="absolute right-4 bottom-4 rounded-full bg-[#FEE500] p-4 z-2"
        onClick={handleShare}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <Share size={32} />
        ) : (
          <Image
            src="/images/icon/kakao.svg"
            width={32}
            height={32}
            alt="카카오톡으로 공유하기"
            priority
          />
        )}
      </Button>
    </>
  );
}
