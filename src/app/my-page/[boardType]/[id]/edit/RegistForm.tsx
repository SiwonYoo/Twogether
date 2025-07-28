'use client';

import Button from '@/components/common/Button';
import { updatePost } from '@/data/actions/post';
import useUserStore from '@/stores/useUserStore';
import { Post } from '@/types/post';
import Link from 'next/link';
import { useActionState, useState } from 'react';

export default function QnaEditRegist({ post }: { post: Post }) {
  const [postState, formAction] = useActionState(updatePost, null);
  const { user } = useUserStore();
  const [title, setTitle] = useState(post.title);

  return (
    <main>
      <form action={formAction} className="m-4">
        <fieldset>
          <legend className="mb-5 text-2xl font-bold">문의 내용</legend>
          <input type="hidden" name="accessToken" value={user?.token?.accessToken ?? ''} />
          <input type="hidden" name="_id" value={post._id} />
          <input type="hidden" name="type" value={post.type} />
          <label htmlFor="question-type" className="sr-only">
            문의 유형 선택
          </label>
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
          <textarea
            id="qna-content"
            defaultValue={post.content}
            className="w-full h-100 resize-none bg-gray-150"
            name="content"
          />
          <p className="text-primary">{postState?.ok === 0 && postState.errors?.content?.msg}</p>
        </fieldset>
        <div className="flex flex-col gap-2">
          <Button size="lg" shape="square" type="submit">
            수정
          </Button>
          <Link href={`/my-page/${post.type}/${post._id}`}>
            <Button bg="white" size="lg" shape="square" type="submit">
              돌아가기
            </Button>
          </Link>
        </div>
      </form>
    </main>
  );
}
