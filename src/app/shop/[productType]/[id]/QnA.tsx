import LinkButton from '@/components/common/LinkButton';
import { getPosts, getProductPost } from '@/data/functions/post';
import { GetPost, Post } from '@/types';
import { ProductDetails } from '@/types/product';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import Link from 'next/link';
import { useEffect, useState } from 'react';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export default function QnA({ product }: ProductDetails) {
  const [noticePage, setNoticePag] = useState<Post[]>([]);
  const [qnaPage, setQnaPag] = useState<GetPost[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function noticeApi() {
      const res = await getPosts('notice');
      if (res.ok === 0) {
        setError(res.message);
        return;
      }

      const items = Array.isArray(res.item) ? res.item : [];
      const sliced = [...items].sort(() => Math.random() - 0.5).slice(0, 2);
      setNoticePag(sliced);
    }

    async function QnAApi() {
      const res = await getProductPost('qna', product._id);
      if (res.ok === 0) {
        return null;
      }
      if (res.ok === 1) {
        setQnaPag(res.item);
      }
    }
    noticeApi();
    QnAApi();
  }, []);

  if (error) {
    return (
      <div className="text-center py-8 rounded-2xl my-6 p-4 text-gray-500">
        <p>Q&A 조회에 실패했습니다.</p>
      </div>
    );
  }

  // 날짜 변환
  function formatToYYMMDD(datetime: string | null | undefined) {
    if (!datetime || typeof datetime !== 'string') return ''; // 입력 유효성 검사
    const datePart = datetime.split(' ')[0]; // "2025.08.02 12:34:56" -> "2025.08.02"
    const [year, month, day] = datePart.split('.');
    if (!year || !month || !day) return ''; // 포맷 이상하면 빈 문자열
    return `${year.slice(-2)}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
  }

  return (
    <>
      <h2 className={`${JudsonFont.className} text-center font-bold text-2xl`}>Q&A</h2>
      <ul>
        {/* 공지 */}
        {noticePage.map((item) => {
          return (
            <li key={`NoticePage-${item._id}`} className="border-b border-(--color-gray-250) my-4">
              <Link href={`/community/notice/${item._id}`}>
                <div className="flex gap-4">
                  <p>공지</p>
                  <p className="font-bold ">{item.title}</p>
                </div>
                <div className="flex gap-4 my-2">
                  <p>{item.user.name}</p>
                  <p>{formatToYYMMDD(item.createdAt)}</p>
                  <p>조회: {item.views}</p>
                </div>
              </Link>
            </li>
          );
        })}

        {/* 여기에 qna 들어갈때 본인만 입장 가능하도록 해야함. 나인지 확인하고 들어가도록 */}
        {qnaPage.map((item) => {
          return (
            <li key={`qnaPage-${item._id}`} className="border-b  border-(--color-gray-250) my-4">
              <Link href={`/my-page/qna/${item._id}`}>
                <div>
                  <p>{item.title}</p>
                </div>
                <div className="flex gap-4 my-2">
                  <h3>
                    {item.user.name.length > 1
                      ? item.user.name[0] + '*'.repeat(item.user.name.length - 1)
                      : item.user.name}
                  </h3>
                  <p>{formatToYYMMDD(item.createdAt)}</p>
                  <p>조회: {item.views}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
