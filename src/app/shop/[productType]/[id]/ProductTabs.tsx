'use client';
import { Judson } from 'next/font/google';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProductDetails } from '@/types/product';
import OverviewPage from '@/app/shop/[productType]/[id]/Overview';
import DetailsPage from '@/app/shop/[productType]/[id]/Details';
import ReviewPage from '@/app/shop/[productType]/[id]/Review';
import QnAPage from '@/app/shop/[productType]/[id]/QnA';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

export default function ProductTabs({ productType, id, item }: ProductDetails) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tabs = ['Overview', 'Details', 'Review', 'Q&A'];
  const initialTab = searchParams.get('tab') || tabs[0];
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const onClickTab = (tab: string) => {
    setActiveTab(tab);
    // 스크롤 위치 고정 옵션 추가
    router.push(`${pathname}?tab=${encodeURIComponent(tab)}`, { scroll: false });
  };

  console.log(item[Number(id)]);

  return (
    <div className="mx-4">
      <nav className="my-6">
        <ul className="grid grid-cols-4 justify-between items-center gap-4">
          {tabs.map((tab, index) => (
            <li key={index} className="p-4 text-center relative">
              <button onClick={() => onClickTab(tab)} className={`pb-2 ${JudsonFont.className}`}>
                {tab}
              </button>
              <span
                className={`absolute left-1/2 bottom-0 -translate-x-1/2 w-full
                  ${activeTab === tab ? 'border-b-3 border-(--color-primary)' : 'border-b-2 border-(--color-white)'}`}
              ></span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4">
        {activeTab === 'Overview' && (
          <div>
            <OverviewPage productType={productType} id={id} item={item[Number(id)]} />
          </div>
        )}
        {activeTab === 'Details' && (
          <div>
            <DetailsPage productType={productType} id={id} item={item} />
          </div>
        )}
        {activeTab === 'Review' && (
          <div>
            <ReviewPage />
          </div>
        )}
        {activeTab === 'Q&A' && (
          <div>
            <QnAPage productType={productType} id={id} item={item} />
          </div>
        )}
      </div>
    </div>
  );
}
