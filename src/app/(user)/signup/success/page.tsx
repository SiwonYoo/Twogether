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
      <div className="flex flex-col gap-4 min-h-full">
        <div className="text-center">
          <p className="mb-2">고객님의 이메일로 인증 메일이 발송되었습니다.</p>
          <p className="mb-5 text-sm">메일에서 인증 완료 후 로그인하실 수 있습니다.</p>
          <LinkButton href="/login" shape="square" lang="eng" size="lg">
            LOGIN
          </LinkButton>
        </div>

        <hr className="self-center w-10 mt-8 mb-6 border-1" />

        <div className="text-center">
          <p className="mb-2">인증 메일을 받지 못하셨나요?</p>
          <p className="mb-5 text-sm">스팸 메일함으로 분류되었을 수 있으니 함께 확인해 주세요.</p>
          <LinkButton href="/resend-verification" shape="square" size="lg" bg="white">
            이메일 인증 문제 해결하기
          </LinkButton>
        </div>
      </div>
    </>
  );
}

export default Success;
