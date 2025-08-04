'use client';

import { PostLikeList } from '@/data/actions/like';
import useUserStore from '@/stores/useUserStore';
import { ApiRes, LikeItem, Product } from '@/types';
import { Heart } from 'lucide-react';
import { redirect } from 'next/navigation';
import { startTransition, useActionState } from 'react';

interface LikeButtonProps {
  id: number;
  onSuccess: () => void;
}

/**
 * 특정 상품을 찜 목록에 추가하는 버튼 컴포넌트입니다.
 *
 * - 사용자가 로그인 상태일 경우, 서버에 찜 추가 요청을 보냅니다.
 * - 로그인되어 있지 않으면 로그인 페이지로 리디렉션합니다.
 * - 요청 중에는 버튼을 비활성화하고 `isPending` 상태를 표시합니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {number} props.id - 찜 추가할 상품의 ID
 *
 * @returns {JSX.Element} 찜 추가 버튼을 포함하는 JSX 엘리먼트
 */

export default function LikeAddButton({ id, onSuccess }: LikeButtonProps) {
  const { user } = useUserStore();
  const initialState: ApiRes<LikeItem[], never> = {
    ok: 1,
    item: [],
  };
  const token = user?.token?.accessToken;

  const [_, formAction, isPending] = useActionState(async () => {
    return await PostLikeList(id, String(token));
  }, initialState);

  const add = async () => {
    if (!user) {
      confirm('로그인을 하셔야 이용가능합니다. 로그인 하시겠습니까?');
      redirect('/login');
      return;
    }
    try {
      startTransition(async () => {
        const res = await formAction();
      }); // 비동기 경계 유지
      console.log('추가 완료', id);
      onSuccess?.();
    } catch (e) {
      console.error('찜 추가 실패', e);
    }
  };

  return (
    <>
      <button onClick={add} disabled={isPending}>
        <Heart fill="none" stroke="#F44336" />
      </button>
    </>
  );
}
