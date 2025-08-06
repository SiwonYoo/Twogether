'use client';

import { Post } from '@/types/post';
import Link from 'next/link';

export default function QnaSearchList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-center text-primary">검색 결과가 없습니다.</p>;
  }

  return (
    <ul className="mt-4">
      {posts.map((post) => (
        <li key={post._id} className="border-b-1 border-b-gray-250">
          <div className="flex gap-7 my-4">
            <Link href={`/my-page/qna/${post._id}`}>
              <span>{post.title}</span>
            </Link>
          </div>
          <div className="flex gap-4 text-sm">
            <span>{post.user.name}</span>
            <span>{post.createdAt}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
