'use client';

import { Post } from '@/types/post';
import Link from 'next/link';

interface Props {
  post: Post;
  boardType: string;
}

export default function QnaList({ post, boardType }: Props) {
  return (
    <li className="border-b-1 border-b-gray-250">
      <div className="flex gap-7 my-4">
        <Link href={`/my-page/${boardType}/${post._id}`}>
          <span>{post.title}</span>
        </Link>
      </div>
      <div className="flex gap-4 text-sm">
        <span>{post.user.name}</span>
        <span>{post.createdAt}</span>
      </div>
    </li>
  );
}
