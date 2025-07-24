import { Post } from '@/types/post';
import Link from 'next/link';

export default async function QnaList({ boardType, post }: { boardType: string; post: Post }) {
  return (
    <li key={post._id} className="border-b-1 border-b-gray-250">
      <div className="flex gap-7 my-4">
        <span>{post._id}</span>
        <Link href={`/my-page/${boardType}/${post._id}`}>
          <span>{post.title}</span>
        </Link>
      </div>
      <div className="flex gap-4 text-sm">
        <span>{post.user._id}</span>
        <span>{post.createdAt}</span>
        <span>조회 0</span>
      </div>
    </li>
  );
}
