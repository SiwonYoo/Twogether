'use client';

import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

interface GotoButtonProps {
  content: string;
  gotoPath: string;
  language?: 'kor' | 'eng';
}

export default function GotoButton({ content, gotoPath, language = 'kor' }: GotoButtonProps) {
  const router = useRouter();

  return (
    <Button
      shape="square"
      bg="primary"
      size="lg"
      type="button"
      lang={language}
      onClick={() => {
        router.replace(gotoPath);
      }}
    >
      {content}
    </Button>
  );
}
