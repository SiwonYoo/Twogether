import { X } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface DialogProps {
  title: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}

/**
 * 다이얼로그(모달) 컴포넌트입니다.
 *
 * @param {string} title - 다이얼로그 제목
 * @param {boolean} isOpen - 다이얼로그 열림 여부 (true일 경우 표시)
 * @param {Dispatch<SetStateAction<boolean>>} setOpen - 다이얼로그 상태 제어 함수
 * @param {React.ReactNode} [children] - 다이얼로그 내부 내용
 */

function Dialog({ title, isOpen, setOpen, children }: DialogProps) {
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
        className="fixed flex h-dvh min-w-[400px] max-w-[768px] mx-auto inset-0 justify-center items-center bg-black/50 z-10"
      >
        <div
          role="dialog"
          className="flex flex-col p-8 w-[80%] h-[80%] rounded-4xl bg-white z-10 animate-fade-in-scale"
        >
          <div className="flex w-full mb-5">
            <h2 className="flex-1 text-xl font-bold">{title}</h2>
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              <X />
            </button>
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Dialog;
