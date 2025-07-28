// MyQnaList.tsx
'use client';

import useUserStore from '@/stores/useUserStore';
import QnaList from './QnaList';
import { Post } from '@/types/post';

export default function MyQnaList({ posts, boardType }: { posts: Post[]; boardType: string }) {
  const { user } = useUserStore();
  const myPosts = posts.filter((post) => post.user._id === user?._id);

  return (
    <ul>
      {myPosts.length === 0 ? (
        <p className="mt-20 text-primary font-bold text-center">문의내역이 존재하지 않습니다.</p>
      ) : (
        myPosts.map((post) => <QnaList key={post._id} post={post} boardType={boardType} />)
      )}
    </ul>
  );
}
