'use client';

import Button from '@/components/common/Button';
import Link from 'next/link';
import { useState } from 'react';
import { createPost } from '@/data/actions/post';
import { useActionState } from 'react';

export default function QnaRegist({ boardType }: { boardType: string }) {
  const [title, setTitle] = useState('[배송] 배송관련 문의드립니다.');
  const [state, formAction, isLoading] = useActionState(createPost, null);
  console.log(isLoading, state);
  return (
    <main>
      <form action={formAction} className="m-4">
        <fieldset>
          <legend className="mb-5 text-2xl font-bold">문의 내용</legend>
          <label htmlFor="question-type" className="sr-only">
            문의 유형 선택
          </label>
          <input type="hidden" name="type" value={boardType} />
          <select
            className="w-full p-3 mb-4 border-1 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="question-type"
            name="title"
          >
            <option value="[배송] 배송관련 문의드립니다.">[배송] 배송관련 문의드립니다.</option>
            <option value="[상품] 상품관련 문의드립니다.">[상품] 상품관련 문의드립니다.</option>
            <option value="[반품] 반품관련 문의드립니다.">[반품] 반품관련 문의드립니다.</option>
            <option value="[기타] 기타관련 문의드립니다.">[기타] 기타관련 문의드립니다.</option>
          </select>
          <label htmlFor="qna-content" className="sr-only">
            문의 내용 입력
          </label>
          <textarea id="qna-content" className="w-full h-100 resize-none bg-gray-150" name="content" />
          <p className="text-2xl text-primary">{state?.ok === 0 && state.errors?.content?.msg}</p>
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
