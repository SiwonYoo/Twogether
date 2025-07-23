'use client';

import Button from '@/components/common/Button';

interface PaymentOptionSectionProps {
  selected: 'credit' | 'bank';
  onChange: (option: 'credit' | 'bank') => void;
}

export default function PaymentOptionSection({ selected, onChange }: PaymentOptionSectionProps) {
  // 결제 방법 옵션
  const paymentOptions: { value: 'credit' | 'bank'; label: string }[] = [
    { value: 'credit', label: '신용카드' },
    { value: 'bank', label: '무통장' },
  ];

  return (
    <section>
      <h2 className="font-bold text-lg mb-4">결제 방법</h2>

      <div className="flex flex-row gap-2">
        {paymentOptions.map((option) => (
          <Button
            key={option.value}
            bg={selected === option.value ? 'primary' : 'white'}
            shape="rounded"
            size="sm"
            type="button"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* 폼 전송 시 결제 방법 포함 */}
      <input type="hidden" name="paymentMethod" value={selected} />
    </section>
  );
}
