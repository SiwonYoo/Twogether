'use client';

import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import TermsContent from '@/app/(user)/signup/terms/TermsContent';
import CheckBox from '@/components/common/CheckBox';
import LinkButton from '@/components/common/LinkButton';
import { useState } from 'react';

function TermsForm() {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  const handleNextStep = () => {
    router.replace('/signup/form');
  };

  return (
    <>
      <CheckBox
        id="terms"
        label="(필수) 이용약관 동의"
        name="terms"
        checked={isChecked}
        onChange={() => {
          setChecked(!isChecked);
        }}
      />
      {error && <p className="text-error text-sm mb-1">{error}</p>}

      <div className="flex flex-col gap-1 h-40 my-4 p-4 border-[.0625rem] border-gray-250 overflow-auto text-sm">
        <TermsContent />
      </div>
      <div className="flex gap-4">
        <LinkButton href="/login" bg="white" shape="square" size="lg">
          취소
        </LinkButton>
        <Button
          type="button"
          onClick={handleNextStep}
          shape="square"
          size="lg"
          bg={`${!isChecked ? 'disabled' : 'primary'}`}
          disabled={!isChecked ? true : false}
        >
          다음
        </Button>
      </div>
    </>
  );
}

export default TermsForm;
