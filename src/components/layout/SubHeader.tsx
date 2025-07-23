'use client';

import { MoveLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SubHeaderProps {
  title?: string;
}

function SubHeader({ title = '상세보기' }: SubHeaderProps) {
  const router = useRouter();

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
        <Link href="/cart" className="self-center">
          <ShoppingBag color="var(--color-black)" size={20} />
        </Link>
      </header>
    </>
  );
}

export default SubHeader;
