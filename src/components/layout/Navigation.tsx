'use client';

import useUserStore from '@/stores/useUserStore';
import { Heart, House, Menu, Search, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Navigation() {
  const user = useUserStore((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="fixed bottom-0 w-full min-w-[400px] max-w-[768px] bg-white z-[1] shadow-2xl">
      <ul className="flex justify-between h-20">
        <li className="contents">
          <Link href="/menu" className="flex flex-col justify-center items-center content-center flex-1 h-full">
            <Menu size={20} />
            {/* <span>메뉴</span> */}
          </Link>
          <Link href="/search" className="flex flex-col justify-center items-center content-center flex-1 h-full">
            <Search size={20} />
            {/* <span>검색</span> */}
          </Link>
          <Link href="/" className="flex flex-col justify-center items-center content-center flex-1 h-full">
            <House size={20} />
            {/* <span>HOME</span> */}
          </Link>
          {isClient ? (
            <>
              <Link
                href={user ? '/like' : '/login'}
                className="flex flex-col justify-center items-center content-center flex-1 h-full"
              >
                <Heart size={20} />
              </Link>
              <Link
                href={user ? '/my-page' : '/login?redirect=/my-page'}
                className="flex flex-col justify-center items-center content-center flex-1 h-full"
              >
                <User size={20} />
              </Link>
            </>
          ) : (
            // 서버 렌더링 시엔 사용자 기반 분기 없이 기본 placeholder (예: 로그인 경로)로 고정
            <>
              <Link href="/login" className="flex flex-col justify-center items-center content-center flex-1 h-full">
                <Heart size={20} />
              </Link>
              <Link
                href="/login?redirect=/my-page"
                className="flex flex-col justify-center items-center content-center flex-1 h-full"
              >
                <User size={20} />
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
