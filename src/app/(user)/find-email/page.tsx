import FindEmailForm from '@/app/(user)/find-email/FindEmailForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이메일 찾기 - Twogether',
  description: 'Twogether의 이메일 찾기 페이지입니다.',

  openGraph: {
    title: '이메일 찾기 - Twogether',
    description: 'Twogether의 이메일 찾기 페이지입니다.',
    url: '/find-email',
  },
};

function FindEmail() {
  return (
    <main className="mx-4 mb-20">
      <p className="text-center">이메일 찾기 페이지입니다.</p>
      <p className="mb-5 text-xs text-gray-350 text-center">본인 확인을 위해 이름과 휴대폰 번호를 입력해 주세요.</p>
      <div className="mx-4">
        <FindEmailForm />
      </div>
    </main>
  );
}

export default FindEmail;
