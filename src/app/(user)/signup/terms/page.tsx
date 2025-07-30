import TermsForm from '@/app/(user)/signup/terms/TermsForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - Twogether',
  description: 'Twogether에 가입하고 다양한 서비스를 이용해 보세요.',

  openGraph: {
    title: '회원가입 - Twogether',
    description: 'Twogether에 가입하고 다양한 서비스를 이용해 보세요.',
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
