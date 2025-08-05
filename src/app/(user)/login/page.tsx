import LoginForm from '@/app/(user)/login/LoginForm';
import LinkButton from '@/components/common/LinkButton';
import { Metadata } from 'next';
import { Judson } from 'next/font/google';
import { Suspense } from 'react';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export const metadata: Metadata = {
  title: '로그인 - Twogether',
  description: 'Twogether에 로그인하고 나만의 스타일을 찾아보세요.',

  openGraph: {
    title: '로그인 - Twogether',
    description: 'Twogether에 로그인하고 나만의 스타일을 찾아보세요.',
    url: '/login',
  },
};

function Login() {
  return (
    <>
      <main className="mx-4 mb-20">
        <h2 className={`mt-5 text-2xl text-center ${JudsonFont.className}`}>LOGIN</h2>
        <div className="flex flex-col px-4">
          <Suspense>
            <LoginForm />
          </Suspense>

          <LinkButton href="/signup/terms" shape="square" size="lg" bg="secondary">
            회원가입
          </LinkButton>

          <hr className="self-center w-10 mt-8 mb-6 border-1" />

          <div className="w-full text-center">
            <p className="mb-5">인증 메일을 받지 못하셨나요?</p>
            <LinkButton href="/resend-verification" shape="square" size="lg" bg="white">
              이메일 인증 문제 해결하기
            </LinkButton>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
