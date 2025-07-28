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
  openGraph: {
    title: '로그인 - Twogether',
    description: '로그인',
    url: '/login',
  },
};

function Login() {
  return (
    <>
      <main className="mx-4 mb-20">
        <h2 className={`mt-5 text-2xl text-center ${JudsonFont.className}`}>LOGIN</h2>
        <div className="px-4">
          <Suspense>
            <LoginForm />
          </Suspense>

          <LinkButton href="/signup/terms" shape="square" size="lg" bg="secondary">
            회원가입
          </LinkButton>
        </div>
      </main>
    </>
  );
}

export default Login;
