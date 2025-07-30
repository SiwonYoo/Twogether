import { Metadata } from 'next';
import Button from '@/components/common/Button';
import GotoButton from '@/components/order-complete/GotoButton';

export const metadata: Metadata = {
  title: '주문 완료 - Twogether',
  openGraph: {
    title: '주문 완료 - Twogether',
    description: '주문 완료',
    url: '/order-complete',
  },
};

export default function OrderCompletePage() {
  return (
    <div className="text-center py-10 px-4">
      <p className="mt-2 text-gray-600">
        감사합니다. <br />
        주문이 완료되었습니다.
      </p>

      <div className="flex flex-col gap-4 mt-4">
        <GotoButton content="주문내역 확인하기" gotoPath="/my-page/order-list" />
        <GotoButton content="HOME" gotoPath="/" language="eng" />
      </div>
    </div>
  );
}
