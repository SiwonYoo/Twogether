'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import LinkButton from '@/components/common/LinkButton';
import { verifySignUpEmail } from '@/data/actions/user';
import { getAllUsers } from '@/data/functions/user';
import Link from 'next/link';
import { useState } from 'react';

function ResendVerificationForm() {
  const [emailValue, setEmailValue] = useState('');
  const [existEmail, setExistEmail] = useState<boolean | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    let existEmailFlag = false;

    const resCheckEmail = await getAllUsers();
    if (!resCheckEmail.ok) return;

    resCheckEmail.item.map((item) => {
      if (item.email === emailValue) {
        if (item.extra.emailConfirm) {
          setIsEmailVerified(true);
        } else {
          setExistEmail(true);
          existEmailFlag = true;
        }
      }
    });

    if (!existEmailFlag) {
      setExistEmail(false);
      return;
    }

    setLoading(true);

    const resVerifySignUpEmail = await verifySignUpEmail(emailValue);
    if (resVerifySignUpEmail.ok) setSentEmail(true);

    setLoading(false);
  };

  return (
    <>
      <div>
        <form onSubmit={sendEmail} className="flex flex-col gap-5 mb-10">
          <Input
            label="이메일"
            id="email"
            placeholder="회원 가입 시 사용하신 이메일을 입력해 주세요."
            value={emailValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmailValue(event.target.value);
            }}
            disabled={sentEmail || isEmailVerified}
          />
          <Button
            type="submit"
            shape="square"
            size="lg"
            disabled={sentEmail || isEmailVerified}
            bg={sentEmail || isEmailVerified ? 'disabled' : 'primary'}
          >
            인증 메일 재전송
          </Button>
        </form>

        {existEmail === false && !isEmailVerified && (
          <div className="flex flex-col gap-2 text-center">
            <strong>⚠️ 입력하신 이메일로 가입된 계정이 없습니다.</strong>
            <p>
              이메일이 기억나지 않으신가요?{' '}
              <Link href="/find-email?redirect=/resend-verification" className="underline">
                이메일 찾기
              </Link>
            </p>
            <p>
              아직 회원이 아니신가요?{' '}
              <Link href="/signup/terms" className="underline">
                회원가입
              </Link>
            </p>
          </div>
        )}

        {loading && <p className="text-center">인증 메일을 전송하는 중입니다.</p>}

        {sentEmail && (
          <div className="text-center">
            <p className="mb-2">고객님의 이메일로 인증 메일이 발송되었습니다.</p>
            <p className="mb-5 text-sm">메일에서 인증 완료 후 로그인하실 수 있습니다.</p>
            <LinkButton href="/login" size="lg" bg="white" shape="square">
              LOGIN
            </LinkButton>
          </div>
        )}

        {isEmailVerified && (
          <>
            <div className="flex flex-col text-center">
              <p className="mb-2">이미 인증 완료된 이메일입니다.</p>
              <p className="mb-5 text-sm">지금 바로 로그인하여 서비스를 이용해보세요.</p>
              <LinkButton href="/login" size="lg" bg="white" shape="square">
                LOGIN
              </LinkButton>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ResendVerificationForm;
