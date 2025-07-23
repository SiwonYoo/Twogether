import { Post } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';

export default function EventList({ post, boardType }: { post: Post; boardType: string }) {
  return (
    <div className="flex flex-col">
      <div className="mb-25">
        <Link href={`/community/${boardType}/${post._id}`}>
          <Image src={`/images/event/event_${post._id}.png`} width={768} height={500} alt="" />
        </Link>
      </div>
    </div>
  );
}
