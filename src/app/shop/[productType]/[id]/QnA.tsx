import LinkButton from '@/components/common/LinkButton';
import { getPosts, getProductPost } from '@/data/functions/post';
import useUserStore from '@/stores/useUserStore';
import { GetPost, Post } from '@/types';
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
  const [qnaPage, setQnaPag] = useState<GetPost[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    async function noticeApi() {
      const res = await getPosts('notice');
      if (res.ok === 0) {
        return (
          <div className="font-bold text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4">
            <p className="text-3xl mb-4">고객님, 진심으로 사과드립니다.</p>
            <p className="text-gray-500">서버 문제로 인해 상품 정보 제공에 차질이 발생했습니다.</p>
            <p className="text-gray-500 my-2">이로 인해 오랜 시간 기다리시게 된 점 깊이 죄송합니다.</p>
            <p className="text-gray-500">빠른 시일 내에 정상화된 상품을 갖추어 찾아뵐 수 있도록 최선을 다하겠습니다.</p>
            <p className="text-gray-500 mb-4 mt-2">불편을 드린 점 다시 한번 사과드리며, 너그러운 양해 부탁드립니다.</p>

            <LinkButton href="/">홈으로 바로가기</LinkButton>
          </div>
        );
      }

      function shuffleArray(array: Post[]): Post[] {
        return [...array].sort(() => Math.random() - 0.5);
      }

      const shuffled = shuffleArray(res.item);
      const selected = shuffled.slice(0, 2);

      if (res.ok === 1) {
        if (res.item.length === 0) {
          return (
            <div className="font-bold text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4">
              <p className="text-3xl mb-4">고객님, 진심으로 사과드립니다.</p>
              <p className="text-gray-500">서버 문제로 인해 상품 정보 제공에 차질이 발생했습니다.</p>
              <p className="text-gray-500 my-2">이로 인해 오랜 시간 기다리시게 된 점 깊이 죄송합니다.</p>
              <p className="text-gray-500">
                빠른 시일 내에 정상화된 상품을 갖추어 찾아뵐 수 있도록 최선을 다하겠습니다.
              </p>
              <p className="text-gray-500 mb-4 mt-2">
                불편을 드린 점 다시 한번 사과드리며, 너그러운 양해 부탁드립니다.
              </p>

              <LinkButton href="/">홈으로 바로가기</LinkButton>
            </div>
          );
        }
        setNoticePag(selected);
      }
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
