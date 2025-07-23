'use client';

import { ChevronRight } from 'lucide-react';
import { Judson } from 'next/font/google';
import { usePathname } from 'next/navigation';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

function EditProfile({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  console.log(path);

  return (
    <>
      <main className="h-full mx-4">
        <h2 className={`mt-5 text-2xl text-center ${JudsonFont.className}`}>EDIT PROFILE</h2>
        <div className="flex gap-4 justify-center py-6 border-b-2 border-gray-350">
          <span className={path === '/my-page/edit-profile/verify' ? 'text-black' : 'text-gray-250'}>1. 본인인증</span>
          <ChevronRight color={'#B0B0B0'} />
          <span className={path === '/my-page/edit-profile/form' ? 'text-black' : 'text-gray-250'}>2. 정보수정</span>
          <ChevronRight color={'#B0B0B0'} />
          <span className={path === '/my-page/edit-profile/success' ? 'text-black' : 'text-gray-250'}>3. 수정완료</span>
        </div>
        <div className="py-6 px-4">{children}</div>
      </main>
    </>
  );
}

export default EditProfile;
