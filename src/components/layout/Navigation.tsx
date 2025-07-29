'use client';

import useUserStore from '@/stores/useUserStore';
import { Heart, House, Menu, Search, User } from 'lucide-react';
import Link from 'next/link';

function Navigation() {
  const user = useUserStore((state) => state.user);

  return (
    <nav className="fixed bottom-0 w-full min-w-[400px] max-w-[768px] bg-white z-[1]">
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
          <Link
            href={user ? '/like' : '/login'}
            className="flex flex-col justify-center items-center content-center flex-1 h-full"
          >
            <Heart size={20} />
            {/* <span>찜</span> */}
          </Link>
          <Link
            href={user ? '/my-page' : '/login'}
            className="flex flex-col justify-center items-center content-center flex-1 h-full"
          >
            <User size={20} />
            {/* <span>마이페이지</span> */}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
