'use client';

import Details from '@/app/shop/[productType]/[id]/Details';
import Overview from '@/app/shop/[productType]/[id]/Overview';
import ProductTypeIdLayout from '@/app/shop/[productType]/[id]/ProductTypeIdLayout';
import QnA from '@/app/shop/[productType]/[id]/QnA';
import Review from '@/app/shop/[productType]/[id]/Review';
import { useState } from 'react';

export default function ProductType({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedTitle, setSelectedTitle] = useState<string>('Overview'); // 초기값

  return (
    <>
      {children}
      <div>
        <ProductTypeIdLayout onSelectTitle={setSelectedTitle} />
      </div>
      <>
        {selectedTitle === 'Overview' && <Overview />}
        {selectedTitle === 'Details' && <Details />}
        {selectedTitle === 'Review' && <Review />}
        {selectedTitle === 'Q&A' && <QnA />}
      </>
    </>
  );
}
