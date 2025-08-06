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

export default function ProductTabs({ productType, product }: ProductDetails) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tabs = ['Overview', 'Details', 'Review', 'Q&A'];
  const initialTab = searchParams.get('tab') || tabs[0];
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [hover, setHover] = useState<number | null>(null);

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

  return (
    <div className="m-4 relative">
      <nav className="my-6 sticky top-15 bg-(--color-white)">
        <ul className="grid grid-cols-4 justify-between items-center gap-4  border-b-1 border-black/1">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className="p-4 text-center relative"
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            >
              <button onClick={() => onClickTab(tab)} className={`pb-2 ${JudsonFont.className}`}>
                {tab}
              </button>
              <span
                className={`absolute left-1/2 bottom-0 -translate-x-1/2 w-full    transition-all duration-200 delay-100
                     ${
                       activeTab === tab || hover === index
                         ? 'border-b-[3px] border-[color:var(--color-primary)]'
                         : 'border-b-2 border-[color:var(--color-white)]'
                     }`}
              ></span>
            </li>
          ))}
        </ul>
      </nav>

      <>
        {activeTab === 'Overview' && (
          <>
            <OverviewPage productType={productType} product={product} />
          </>
        )}
        {activeTab === 'Details' && (
          <>
            <DetailsPage productType={productType} product={product} />
          </>
        )}
        {activeTab === 'Review' && (
          <>
            <ReviewPage product={product} />
          </>
        )}
        {activeTab === 'Q&A' && (
          <>
            <QnAPage productType={productType} product={product} />
          </>
        )}
      </>
    </div>
  );
}
