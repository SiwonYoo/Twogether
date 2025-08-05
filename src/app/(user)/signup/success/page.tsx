import LinkButton from '@/components/common/LinkButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - Twogether',
  description: 'Twogether에 가입하고 다양한 서비스를 이용해 보세요.',

  openGraph: {
    title: '회원가입 - Twogether',
    description: 'Twogether에 가입하고 다양한 서비스를 이용해 보세요.',
    url: '/signup/success',
  },
};

function Success() {
  return (
    <>
      <div className="min-h-full flex flex-col gap-4 items-center">
        <div className="text-center">
          <p className="mb-1">회원님의 이메일로 인증 메일이 발송되었습니다.</p>
          <p className="text-sm">
            메일함에서 <strong>[이메일 인증]</strong> 버튼을 눌러주세요.
            <br />
            인증 후 로그인하실 수 있습니다.
          </p>
        </div>

        <hr className="w-10 mt-5 border-1" />

        <div className="text-center text-sm">
          <p>이미 인증하셨다면,</p>
          <p className="mb-4">지금 바로 쇼핑을 시작해보세요!</p>
          <LinkButton href="/login" shape="square" lang="eng" bg="white">
            LOGIN
          </LinkButton>
        </div>
      </div>
    </>
  );
}

export default Success;
