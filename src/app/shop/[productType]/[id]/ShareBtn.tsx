import Button from '@/components/common/Button';
import { Share } from 'lucide-react';

export default function ShareBtn() {
  return (
    <>
      <Button className="absolute right-4 bottom-4 rounded-full bg-(--color-white)">
        <Share />
      </Button>
    </>
  );
}
