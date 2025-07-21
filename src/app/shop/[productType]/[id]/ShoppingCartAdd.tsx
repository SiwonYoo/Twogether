import Button from '@/components/common/Button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ShoppingCartAdd() {
  return (
    <>
      <button className="flex justify-center items-center border border-(--color-primary) text-center w-1/4 px-6 py-2 bg-(--color-white)">
        <ShoppingBag />
      </button>
    </>
  );
}
