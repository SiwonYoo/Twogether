import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import useUserStore from '@/stores/useUserStore';
import { useState } from 'react';
import Alert from '@/components/common/Alert';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

function Header() {
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
      <header className="sticky top-0 flex justify-between h-24 w-full px-5 bg-white z-10">
        <button
          onClick={() => router.push('/')}
          className={`content-center text-3xl text-black ${JudsonFont.className} hover:cursor-pointer`}
        >
          Twogether
        </button>
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

export default Header;
