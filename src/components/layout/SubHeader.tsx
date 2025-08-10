'use client';

import { MoveLeft, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/useUserStore';
import { useState } from 'react';
import Alert from '@/components/common/Alert';

interface SubHeaderProps {
  title?: string;
}

function SubHeader({ title = '상세보기' }: SubHeaderProps) {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertReplacePath, setAlertReplacePath] = useState<string | null>(null);

  const onCartClick = () => {
    if (!isLoggedIn) {
      setAlertMessage('로그인이 필요한 서비스 입니다.');
      setIsAlertOpen(true);
      setAlertReplacePath('/login?redirect=/cart');
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

      <Alert isOpen={isAlertOpen} setOpen={setIsAlertOpen} replacePath={alertReplacePath}>
        <p className="break-keep text-center">{alertMessage}</p>
      </Alert>
    </>
  );
}

export default SubHeader;
