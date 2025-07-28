import TermsForm from '@/app/(user)/signup/terms/TermsForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - Twogether',
  openGraph: {
    title: '회원가입 - Twogether',
    description: '회원가입 이용약관 동의',
    url: '/signup/terms',
  },
};

function Terms() {
  return (
    <>
      <TermsForm />
    </>
  );
}

export default Terms;
