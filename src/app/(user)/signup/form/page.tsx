import SignupForm from '@/app/(user)/signup/form/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - Twogether',
  openGraph: {
    title: '회원가입 - Twogether',
    description: '회원가입',
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
