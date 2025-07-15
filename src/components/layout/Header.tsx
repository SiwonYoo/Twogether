import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Judson } from 'next/font/google'; // 구글 폰트 사용

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

function Header() {
  return (
    <>
      <header className="flex justify-between h-24 w-full px-5 bg-white">
        <Link href="/" className="content-center text-3xl text-black">
          <h1 className={`${JudsonFont.className}`}>Twogether</h1>
        </Link>
        <Link href="/cart" className="content-center">
          <ShoppingBag color="var(--color-black)" size={20} />
        </Link>
      </header>
    </>
  );
}

export default Header;
