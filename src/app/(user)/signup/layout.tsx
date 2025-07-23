'use client';

import { ChevronRight } from 'lucide-react';
import { Judson } from 'next/font/google';
import { usePathname } from 'next/navigation';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

function Signup({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <>
      <main className="h-full mx-4">
        <h2 className={`mt-5 text-2xl text-center ${JudsonFont.className}`}>SIGN UP</h2>
        <div className="flex gap-4 justify-center py-6 border-b-2 border-gray-350">
          <span className={path === '/signup/terms' ? 'text-black' : 'text-gray-250'}>1. 약관동의</span>
          <ChevronRight color={'#B0B0B0'} />
          <span className={path === '/signup/form' ? 'text-black' : 'text-gray-250'}>2. 정보입력</span>
          <ChevronRight color={'#B0B0B0'} />
          <span className={path === '/signup/success' ? 'text-black' : 'text-gray-250'}>3. 가입완료</span>
        </div>
        <div className="py-6 px-4">{children}</div>
      </main>
    </>
  );
}

export default Signup;
