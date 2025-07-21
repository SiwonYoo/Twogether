'use client';

import Button from '@/components/common/Button';
import Link from 'next/link';
import { useState } from 'react';

const posts = {
  id: '1',
  type: 'qna',
  name: '나문희',
  title: 'delivery',
  content: '언제 배송돼요???????????????',
  createdAt: '25.08.01',
};

export default function QnaEditRegist() {
  const [title, setTitle] = useState('[배송] 배송관련 문의드립니다.');
  return (
    <main>
      <form className="m-4">
        <fieldset>
          <legend className="mb-5 text-2xl font-bold">문의 내용</legend>
          <label htmlFor="question-type" className="sr-only">
            문의 유형 선택
          </label>
          <select
            className="w-full p-3 mb-4 border-1 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="question-type"
          >
            <option value="delivery">[배송] 배송관련 문의드립니다.</option>
            <option value="product">[상품] 상품관련 문의드립니다.</option>
            <option value="return">[반품] 반품관련 문의드립니다.</option>
            <option value="etc">[기타] 기타관련 문의드립니다.</option>
          </select>
          <label htmlFor="qna-content" className="sr-only">
            문의 내용 입력
          </label>
          <textarea id="qna-content" defaultValue={posts.content} className="w-full h-100 resize-none bg-gray-150" />
        </fieldset>
        <div className="flex flex-col gap-2">
          <Button size="lg" shape="square" type="submit">
            등록
          </Button>
          <Link href="/my-page/qna">
            <Button bg="white" size="lg" shape="square" type="submit">
              돌아가기
            </Button>
          </Link>
        </div>
      </form>
    </main>
  );
}
