import ResendVerificationForm from '@/app/(user)/resend-verification/ResendVerificationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이메일 인증 - Twogether',
  description: 'Twogether의 이메일 인증 페이지입니다.',

  openGraph: {
    title: '이메일 인증 - Twogether',
    description: 'Twogether의 이메일 인증 페이지입니다.',
    url: '/find-email',
  },
};

function ResendVerification() {
  return (
    <>
      <main className="mx-4 mb-20">
        <p className="text-center">이메일 재인증 페이지입니다.</p>
        <p className="mb-5 text-xs text-gray-350 text-center">회원 가입 시 사용하신 이메일을 입력해 주세요.</p>
        <div className="mx-4">
          <ResendVerificationForm />
        </div>
      </main>
    </>
  );
}

export default ResendVerification;
