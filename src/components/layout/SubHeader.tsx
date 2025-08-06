'use client';

import { MoveLeft, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/useUserStore';

interface SubHeaderProps {
  title?: string;
}

function SubHeader({ title = '상세보기' }: SubHeaderProps) {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();

  const onCartClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스 입니다.');
      router.push('/login?redirect=/cart');
    } else {
      router.push('/cart');
    }
  };

  return (
    <>
      <header className="sticky top-0 flex justify-between h-15 w-full px-5 bg-white z-10">
        <h1 className="hidden">Twogether</h1>
        <button
          onClick={() => {
            router.back();
          }}
        >
          <MoveLeft size={20} />
        </button>
        <h2 className="flex-1 content-center px-4">{title}</h2>
        <button onClick={onCartClick} className="content-center hover:cursor-pointer">
          <ShoppingBag color="var(--color-black)" size={20} />
        </button>
      </header>
    </>
  );
}

export default SubHeader;
