'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { verifyEmail } from '@/data/actions/user';
import useUserStore from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const verificationCodeExp = /^[0-9]$/;

function VerifyForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userCode, setUserCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [currentFocusIdx, setCurrentFocusIdx] = useState(-1);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [leftTime, setLeftTime] = useState(5 * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const user = useUserStore((state) => state.user);

  // 랜덤 코드 생성 함수 (숫자 6자리)
  function createRandomCode() {
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
      randomCode += Math.floor(Math.random() * 10);
    }

    setVerificationCode(randomCode);
    setLeftTime(5 * 60);
  }

  // 인증 메일 전송 (API) + 인증코드 타이머 설정
  useEffect(() => {
    if (verificationCode === '') return;

    const sendEmail = async () => {
      const res = await verifyEmail(email, verificationCode);
      if (res.ok) {
        setIsEmailSent(true);
      }
    };
    sendEmail();

    timerRef.current = setInterval(() => {
      setLeftTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [verificationCode]);

  // 남은 시간이 0일 경우, interval clear
  useEffect(() => {
    if (leftTime === 0) {
      setVerificationCode('');
      clearInterval(timerRef.current!);
    }
  }, [leftTime]);

  // 메일을 보낸 상태가 아닐 경우, interval clear
  useEffect(() => {
    if (!isEmailSent && timerRef.current) clearInterval(timerRef.current!);
  }, [isEmailSent]);

  // 코드 입력 함수 (onChange)
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

  // 키 입력 이벤트 핸들러 (백스페이스 처리)
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

  // 자동 포커싱
  useEffect(() => {
    if (currentFocusIdx < 0) return;
    inputRefs.current[currentFocusIdx]?.focus();
  }, [currentFocusIdx]);

  // 이메일 전송 함수 ('이메일 전송' 버튼 클릭 시)
  const handleClickSendEmail = async (event: FormEvent) => {
    event.preventDefault();
    if (user?.email !== email) {
      alert('본인 계정의 이메일을 입력해 주세요.');
      return;
    }

    createRandomCode();
  };

  // 리셋 함수 ('이메일 재전송' 버튼 클릭 시)
  const verificationReset = () => {
    setIsEmailSent(false);
    setAttemptCount(0);
    setUserCode([]);
  };

  // 인증 함수 ('인증' 버튼 클릭 시)
  const handleNextStep = (event: FormEvent) => {
    event.preventDefault();

    if (verificationCode === '') {
      alert(`인증에 실패했습니다. 다시 시도해 주세요.\n(유효 시간 만료)`);
      verificationReset();
      return;
    }

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
        alert(`인증에 실패했습니다. 다시 시도해 주세요.\n(시도 횟수 초과)`);
        verificationReset();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 mb-20">
        <form onSubmit={handleClickSendEmail} className="flex flex-col gap-5">
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
              <p className="text-center">고객님의 이메일로 인증번호가 전송되었습니다.</p>
              {leftTime > 0 ? (
                <p className="text-xs text-center">
                  {Math.floor(leftTime / 60)}분 {leftTime % 60}초 내에 인증번호 입력 후 [인증] 버튼을 클릭해 주세요.
                </p>
              ) : (
                <p className="text-xs text-error text-center">유효시간이 만료되었습니다. 이메일을 다시 보내주세요.</p>
              )}
            </div>
            <div className="flex gap-1 self-center">
              {Array.from({ length: 6 }).map((item, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
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
                bg={userCode.join().length > 10 && leftTime > 0 ? 'primary' : 'disabled'}
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
