import { Post } from '@/types/post';
import Link from 'next/link';

export default function NoticeList({
  post,
  boardType,
  isNotice,
}: {
  post: Post;
  boardType: string;
  isNotice: boolean;
}) {
  return (
    <>
      {/* 게시판 목록 */}
      <li className="border-b-1 border-b-gray-250">
        <div className="flex gap-7 my-4">
          {isNotice ? <span className="font-bold">공지</span> : <span>{post._id}</span>}
          <Link href={`/community/${boardType}/${post._id}`}>
            {isNotice ? <span className="font-bold">{post.title}</span> : <span>{post.title}</span>}
          </Link>
        </div>
        <div className="flex gap-4 text-sm">
          <span>{post.user._id}</span>
          <span>{post.createdAt}</span>
          <span>조회 {post.views}</span>
        </div>
      </li>
    </>
  );
}
