'use client';

import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

interface ReplaceButtonProps {
  replacePath: string;
  content: string;
  color?: 'white' | 'primary';
}

function ReplaceButton({ replacePath, content, color }: ReplaceButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.replace(replacePath);
  };

  return (
    <>
      <Button onClick={handleClick} shape="square" lang="eng" size="lg" bg={color}>
        {content}
      </Button>
    </>
  );
}

export default ReplaceButton;
