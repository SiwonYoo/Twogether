'use client';

import TermsListItem from '@/components/order/TermsListItem';
import Dialog from '@/components/common/Dialog';
import React, { useState } from 'react';

const REQUIRED_TAG = '(필수)';

export interface TermInfo {
  title: string;
  content: string;
  required: boolean;
  highlight?: boolean;
}

interface TermsSectionProps {
  termInfos: TermInfo[];
  agreedTerms: Record<string, boolean>;
  setAgreedTerms: (state: Record<string, boolean>) => void;
}

export default function TermsSection({ termInfos, agreedTerms, setAgreedTerms }: TermsSectionProps) {
  // Dialog 상태 관리
  // 열렸는지
  const [isOpen, setIsOpen] = useState(false);
  // 어떤 약관이 선택됐는지 => Dialog에서 보여줄 약관 정보 세팅 위함
  const [selectedTerm, setSelectedTerm] = useState<TermInfo | null>(null);

  // 약관 자세히 보기 버튼에 달아줄 함수
  const openDialog = (termInfo: TermInfo) => {
    setIsOpen(true);
    setSelectedTerm(termInfo);
  };

  // 약관 체크박스 토글시
  const handleCheck = (title: string, checked: boolean) => {
    // <전체 동의> 체크 시 모든 항목을 한꺼번에 처리
    if (title === '전체 동의') {
      const newState: Record<string, boolean> = {};

      termInfos.forEach((term) => {
        newState[term.title] = checked;
      });
      setAgreedTerms(newState);
      return;
    }

    // 개별 항목 처리
    const newState = { ...agreedTerms, [title]: checked };

    // 모든 개별 항목이 체크 =>  <전체 동의> 자동 체크
    const allChecked = termInfos.filter((t) => t.title !== '전체 동의').every((t) => newState[t.title]);
    newState['전체 동의'] = allChecked;

    setAgreedTerms(newState);
  };

  return (
    <>
      <ul className="flex flex-col gap-4">
        {termInfos.map((term) => {
          const label = `${term.required ? REQUIRED_TAG : ''} ${term.title}`;
          return (
            <li key={term.title}>
              <TermsListItem
                termInfo={{ ...term, title: label }}
                checked={!!agreedTerms[term.title]}
                onCheck={(checked) => handleCheck(term.title, checked)}
                onDialogButtonClick={() => openDialog(term)}
              />
            </li>
          );
        })}
      </ul>

      <Dialog title={selectedTerm?.title || ''} isOpen={isOpen} setOpen={setIsOpen}>
        <p>{selectedTerm?.content}</p>
      </Dialog>
    </>
  );
}
