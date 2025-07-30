import SignupForm from '@/app/(user)/signup/form/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - Twogether',
  description: 'Twogether에 가입하고 다양한 서비스를 이용해 보세요.',

  openGraph: {
    title: '회원가입 - Twogether',
    description: 'Twogether에 가입하고 다양한 서비스를 이용해 보세요.',
    url: '/signup/form',
  },
};

function Form() {
  return (
    <>
      <div className="px-4">
        <SignupForm />
      </div>
    </>
  );
}

export default Form;
