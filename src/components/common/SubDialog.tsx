'use client';

import Button from '@/components/common/Button';
import LinkButton from '@/components/common/LinkButton';
import React, { Dispatch, SetStateAction, useEffect } from 'react';

interface SubDialogProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * 다이얼로그(모달) 컴포넌트입니다.
 *
 * @param {boolean} isOpen - 다이얼로그 열림 여부 (true일 경우 표시)
 * @param {Dispatch<SetStateAction<boolean>>} setOpen - 다이얼로그 상태 제어 함수
 */

function SubDialog({ isOpen, setOpen }: SubDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      <div
        hidden={!isOpen}
        onClick={() => {
          setOpen(false);
        }}
        className="fixed flex h-dvh min-w-[400px] max-w-[768px] mx-auto inset-0 items-end bg-black/50 z-10"
      >
        <div
          role="dialog"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
          className="p-8 w-[100%] h-[20%] rounded-t-4xl bg-white z-10 animate-fade-in"
        >
          <h2 className="text-xl font-bold mb-5 text-center">장바구니에 추가되었습니다.</h2>
          <div className="flex gap-5">
            <Button
              size="lg"
              shape="square"
              onClick={() => {
                setOpen(false);
              }}
            >
              계속 쇼핑하기
            </Button>
            <LinkButton href="/cart" size="lg" shape="square">
              장바구니 바로가기
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubDialog;
