import Button from '@/components/common/Button';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import { Judson } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export const metadata: Metadata = {
  title: '마이페이지 - Twogether',
  openGraph: {
    title: '마이페이지 - Twogether',
    description: '마이페이지',
    url: '/my-page',
  },
};

function MyPage() {
  return (
    <>
      <main className="mx-4">
        <div className="flex flex-col gap-4 mb-20">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src="/images/model/main-model2.png"
              width={44}
              height={44}
              alt="프로필 이미지"
              className="aspect-square rounded-full object-cover"
            />
            <p>
              <span>김멋사</span> 님
            </p>
          </div>
          <div className="flex justify-between items-center p-5 rounded-lg border-[.0625rem] border-gray-150 text-sm">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-lg">0</span>
              <span>입금 전</span>
            </div>
            <ChevronRight color={'#B0B0B0'} />
            <div className="flex flex-col gap-1 items-center">
              <span className="text-lg">0</span>
              <span>준비 중</span>
            </div>
            <ChevronRight color={'#B0B0B0'} />
            <div className="flex flex-col gap-1 items-center">
              <span className="text-lg">1</span>
              <span>배송 중</span>
            </div>
            <ChevronRight color={'#B0B0B0'} />
            <div className="flex flex-col gap-1 items-center">
              <span className="text-lg">0</span>
              <span>배송 완료</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className={`text-2xl ${JudsonFont.className}`}>Shopping</h2>
              <ul className="my-1 border-y-[.0625rem] border-gray-350">
                <li>
                  <Link href="/my-page/order-list" className="block p-4 border-b-[.0625rem] border-gray-150">
                    주문 내역
                  </Link>
                </li>
                <li>
                  <Link href="/my-page/review" className="block p-4">
                    내가 쓴 리뷰
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`text-2xl ${JudsonFont.className}`}>Account</h2>
              <ul className="my-1 border-y-[.0625rem] border-gray-350">
                <li>
                  <Link href="/my-page/edit-profile/verify" className="block p-4">
                    개인 정보 수정
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`text-2xl ${JudsonFont.className}`}>Support</h2>
              <ul className="my-1 border-y-[.0625rem] border-gray-350">
                <li>
                  <Link href="/my-page/qna" className="block p-4 border-b-[.0625rem] border-gray-150">
                    1:1 문의
                  </Link>
                </li>
                <li>
                  <Link href="/community/notice" className="block p-4">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Button lang="eng">LOGOUT</Button>
        </div>
      </main>
    </>
  );
}

export default MyPage;
