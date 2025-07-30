'use client';

import { DeleteLikeList, revalidateAndRedirectLike } from '@/data/actions/like';
import useUserStore from '@/stores/useUserStore';
import { ApiRes, LikeItem } from '@/types';
import { Heart } from 'lucide-react';
import { startTransition, useActionState, useState } from 'react';

interface LikeButtonProps {
  Itemid: number;
}

/**
 * 특정 상품을 찜 목록에서 삭제하는 버튼 컴포넌트입니다.
 *
 * - 버튼 클릭 시 서버에 삭제 요청을 보냅니다.
 * - 요청이 완료되면 `/like` 페이지를 다시 유효화(revalidate)하고 리디렉션합니다.
 * - 요청 중에는 버튼이 비활성화됩니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {number} props.Itemid - 삭제할 찜 항목의 ID
 *
 * @returns {JSX.Element} 찜 삭제 버튼을 포함하는 JSX 엘리먼트
 */

export default function LikeDelButton({ Itemid }: LikeButtonProps) {
  const { user } = useUserStore();
  const initialState: ApiRes<LikeItem[], never> = {
    ok: 1,
    item: [],
  };

  const token = user?.token?.accessToken;

  const [_, formAction, isPending] = useActionState(async () => {
    return await DeleteLikeList(Number(Itemid), String(token));
  }, initialState);

  const Del = () => {
    startTransition(() => {
      formAction();
    });
    revalidateAndRedirectLike();

    console.log('삭제완료', Itemid);
  };

  return (
    <>
      <button onClick={Del} disabled={isPending}>
        <Heart fill="#F44336" stroke="none" />
      </button>
    </>
  );
}
