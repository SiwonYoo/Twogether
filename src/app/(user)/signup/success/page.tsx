import LinkButton from '@/components/common/LinkButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - Twogether',
  openGraph: {
    title: '회원가입 - Twogether',
    description: '회원가입 성공',
    url: '/signup/success',
  },
};

function Success() {
  return (
    <>
      <div className="min-h-full flex flex-col gap-4 items-center">
        <p className="text-center">
          환영합니다.
          <br />
          회원가입이 완료되었습니다.
        </p>
        <LinkButton href="/login" shape="square" lang="eng">
          LOGIN
        </LinkButton>
      </div>
    </>
  );
}

export default Success;
