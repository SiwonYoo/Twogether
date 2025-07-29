'use client';

import { PostLikeList } from '@/data/actions/like';
import useUserStore from '@/stores/useUserStore';
import { ApiRes, LikeItem } from '@/types';
import { Heart } from 'lucide-react';
import { startTransition, useActionState } from 'react';

interface LikeButtonProps {
  id: number;
}

export default function LikeButton({ id }: LikeButtonProps) {
  const { user } = useUserStore();
  const initialState: ApiRes<LikeItem[], never> = {
    ok: 1,
    item: [],
  };

  const token = user?.token?.accessToken;
  const [state, formAction, isPending] = useActionState(async () => {
    return await PostLikeList(id, String(token));
  }, initialState);
  console.log('state', state);
  console.log('isPending', isPending);

  const add = () =>
    startTransition(() => {
      formAction();
    });

  return (
    <>
      <button onClick={add} disabled={isPending}>
        <Heart fill={state ? '#F44336' : 'none'} stroke={state ? 'none' : '#F44336'} />
      </button>
      <div
        className="absolute left-1/2 -top-[2.5rem] w-full -translate-x-1/2 bg-(--color-white) p-2 rounded-2xl shadow-2xl"
        hidden={!state}
      >
        {state ? <p>찜 완료!</p> : <p>찜 삭제</p>}
      </div>
    </>
  );
}
