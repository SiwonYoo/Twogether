'use client';

import Button from '@/components/common/Button';
import { deletePost } from '@/data/actions/post';
import useUserStore from '@/stores/useUserStore';
import { useActionState } from 'react';

export default function DeleteForm({ boardType, id }: { boardType: string; id: string }) {
  const { user } = useUserStore();
  const [state, formAction, isLoading] = useActionState(deletePost, null);
  console.log(state, isLoading);
  console.log('boardType :', boardType);
  console.log('id : ', id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) event.preventDefault();
  };
  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="type" value={boardType} />
      <input type="hidden" name="accessToken" value={user?.token?.accessToken ?? ''} />
      <Button shape="square" type="submit" disabled={isLoading} bg="primary">
        삭제
      </Button>
    </form>
  );
}
