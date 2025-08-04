'use client';

import DeleteForm from '@/app/my-page/[boardType]/[id]/DeleteForm';
import LinkButton from '@/components/common/LinkButton';
import useUserStore from '@/stores/useUserStore';

interface Props {
  boardType: string;
  postId: number;
  authorId?: number;
}

export default function ButtonSection({ boardType, postId, authorId }: Props) {
  const { user } = useUserStore();

  if (!user || user._id !== authorId) return null;

  return (
    <div className="flex justify-end gap-4 my-3">
      <LinkButton href={`/my-page/${boardType}/${postId}/edit`} shape="square">
        수정
      </LinkButton>

      <DeleteForm boardType={boardType} id={postId.toString()} />
    </div>
  );
}
