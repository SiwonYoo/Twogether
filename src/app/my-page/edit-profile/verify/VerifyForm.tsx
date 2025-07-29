'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function VerifyForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState<boolean>(true);

  const handleNextStep = () => {
    if (isVerified) router.replace('/my-page/edit-profile/form');
  };

  return (
    <form className="flex flex-col gap-5">
      <input type="text" name="username" autoComplete="username" className="hidden" aria-hidden />
      <Input
        id="email"
        type="email"
        placeholder="E-MAIL"
        label="이메일"
        hideLabel={true}
        autoComplete="email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
      />
      <Button
        type="button"
        onClick={handleNextStep}
        bg={emailExp.test(email) ? 'white' : 'disabled'}
        disabled={!emailExp.test(email)}
        shape="square"
        size="lg"
      >
        인증하기
      </Button>
    </form>
  );
}

export default VerifyForm;
