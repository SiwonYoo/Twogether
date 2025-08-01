'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { verifyEmail } from '@/data/actions/user';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const verificationCodeExp = /^[A-Z0-9]$/;

function VerifyForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userCode, setUserCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [currentFocusIdx, setCurrentFocusIdx] = useState(-1);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    createRandomCode();
  }, []);

  function createRandomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
      randomCode += chars[Math.floor(Math.random() * 36)];
    }
    setVerificationCode(randomCode);
  }

  const handleInputCode = (idx: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    if (inputValue && typeof inputValue === 'string') {
      inputValue = inputValue.toUpperCase();
    }

    const inputValues = [...userCode];
    if (verificationCodeExp.test(inputValue)) {
      inputValues[idx] = inputValue;
      setUserCode(inputValues);
      setCurrentFocusIdx(idx + 1);
    }
  };

  const handleKeyDown = (idx: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputKey = event.key;
    const inputValues = [...userCode];

    if (inputKey === 'Backspace') {
      if (inputValues[idx] === '') {
        setCurrentFocusIdx(idx - 1);
      } else {
        inputValues[idx] = '';
        setUserCode(inputValues);
      }
    }
  };

  useEffect(() => {
    if (currentFocusIdx < 0) return;
    inputRefs.current[currentFocusIdx]?.focus();
  }, [currentFocusIdx]);

  const sendEmail = async (event: FormEvent) => {
    event.preventDefault();

    const res = await verifyEmail(email, verificationCode);
    if (res.ok) setIsEmailSent(true);
  };

  const verificationReset = () => {
    setIsEmailSent(false);
    createRandomCode();
    setAttemptCount(0);
    setUserCode([]);
  };

  const handleNextStep = (event: FormEvent) => {
    event.preventDefault();
    const userCodeFull = userCode.join('');
    if (userCodeFull === verificationCode) {
      alert('인증되었습니다.');
      router.replace('/my-page/edit-profile/form');
    } else {
      if (attemptCount < 2) {
        alert(`인증에 실패했습니다. 다시 입력해 주세요.\n(시도 횟수: ${attemptCount + 1}/3)`);
        setAttemptCount((prev) => prev + 1);
        setUserCode([]);
      } else {
        alert(`인증에 실패했습니다. 다시 시도해 주세요.\n(시도 횟수: ${attemptCount + 1}/3)`);
        verificationReset();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 mb-20">
        <form onSubmit={sendEmail} className="flex flex-col gap-5">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="E-MAIL"
              label="이메일"
              hideLabel={true}
              autoComplete="email"
              disabled={isEmailSent}
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
            {isEmailSent && <p className="text-success text-sm mt-1">인증번호가 전송되었습니다.</p>}
          </div>

          {!isEmailSent && (
            <Button
              type="submit"
              bg={emailExp.test(email) ? 'white' : 'disabled'}
              disabled={!emailExp.test(email)}
              shape="square"
              size="lg"
            >
              이메일 전송
            </Button>
          )}
        </form>

        {isEmailSent && (
          <form onSubmit={handleNextStep} className="flex flex-col gap-5">
            <div>
              <p className="text-center">회원님의 이메일로 인증번호가 전송되었습니다.</p>
              <p className="text-xs text-gray-350 text-center">인증번호 입력 후 [인증] 버튼을 클릭해 주세요.</p>
            </div>
            <div className="flex gap-1 self-center">
              {Array.from({ length: 6 }).map((item, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={userCode[idx] || ''}
                  onChange={(event) => handleInputCode(idx, event)}
                  onKeyDown={(event) => handleKeyDown(idx, event)}
                  aria-label={`인증번호 ${idx + 1}`}
                  className=" w-11 h-11 rounded-2xl border-1 border-gray-250 text-center"
                />
              ))}
            </div>
            <div className="flex gap-4">
              <Button type="button" onClick={verificationReset} bg={'white'} shape="square" size="lg">
                이메일 재전송
              </Button>
              <Button
                type="submit"
                bg={userCode.join().length > 10 ? 'primary' : 'disabled'}
                disabled={!(userCode.join().length > 10)}
                shape="square"
                size="lg"
              >
                인증
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default VerifyForm;
