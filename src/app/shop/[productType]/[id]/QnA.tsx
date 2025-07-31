import { getPosts } from '@/data/functions/post';
import useUserStore from '@/stores/useUserStore';
import { Post } from '@/types';
import { ProductDetails } from '@/types/product';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import Link from 'next/link';
import { useEffect, useState } from 'react';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export default function QnA({ productType, product }: ProductDetails) {
  const [NoticePage, setNoticePag] = useState<Post[]>([]);
  const [qnaPage, setQnaPag] = useState<Post[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    async function noticeApi() {
      const res = await getPosts('notice');
      if (res.ok === 0) {
        return null;
      }
      if (res.ok === 1) {
        setNoticePag(res.item);
      }
      console.log(res);
    }

    async function QnAApi() {
      const res = await getPosts('qna');
      if (res.ok === 0) {
        return null;
      }
      if (res.ok === 1) {
        setQnaPag(res.item);
      }
      console.log(res);
    }
    noticeApi();
    QnAApi();
  }, [NoticePage, qnaPage]);

  // 날짜 변환
  function formatToYYMMDD(datetime: string) {
    const [datePart] = datetime.split(' ');
    const [year, month, day] = datePart.split('.');
    return `${year.slice(2)}.${month}.${day}`;
  }

  return (
    <>
      <h2 className={`${JudsonFont.className} text-center font-bold text-2xl`}>Q&A</h2>
      <ul>
        {/* 공지 */}
        {NoticePage.slice(0, 2).map((item) => {
          return (
            <li key={item._id} className="border-b border-(--color-gray-250) my-4">
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

        {qnaPage.map((item) => {
          return (
            <li key={item._id} className="border-b  border-(--color-gray-250) my-4">
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
