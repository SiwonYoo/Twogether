'use client';

import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface AlertProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  replacePath?: string | null;
  children?: React.ReactNode;
}

/**
 * 경고창 컴포넌트입니다.
 *
 * @param {boolean} isOpen - 경고창 열림 여부 (true일 경우 표시)
 * @param {Dispatch<SetStateAction<boolean>>} setOpen - 경고창 상태 제어 함수
 * @param {React.ReactNode} [children] - 경고창 내부 내용
 */

function Alert({ isOpen, setOpen, replacePath = null, children }: AlertProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleAlertClose = () => {
    setOpen(false);
    if (replacePath) router.replace(replacePath);
  };

  return (
    <>
      <div
        hidden={!isOpen}
        className="fixed flex h-dvh min-w-[25rem] max-w-[48rem] mx-auto inset-0 justify-center items-center bg-black/50 z-10"
      >
        <div
          role="dialog"
          className="flex flex-col gap-8 items-center p-8 w-[90%] max-w-[25rem] rounded-4xl bg-white z-10"
        >
          <div>{children}</div>
          <Button size="lg" onClick={handleAlertClose}>
            확인
          </Button>
        </div>
      </div>
    </>
  );
}

export default Alert;
