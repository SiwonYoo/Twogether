import Input from '@/components/common/Input';
import Link from 'next/link';

export default function NoticeList() {
  const posts = [
    // 더미 데이터
    {
      id: '1',
      type: 'notice',
      title: '투게더 교환 및 반품 안내',
      content:
        '안녕하세요. 투게더 입니다. 내용 테스트를 위해 지금 계속 길게 길게 길게 길게 길게 길게 길게 치는 중입니다.',
      name: '투게더',
      date: '25.08.01',
    },
    {
      id: '2',
      type: 'notice',
      title: '배송 안내',
      content: '안녕하세요. 투게더 입니다.',
      name: '투게더',
      date: '25.08.01',
    },
    { id: '3', type: 'notice', title: '게시물 1', content: '내용없음', name: '투게더', date: '25.08.01' },
    { id: '4', type: 'notice', title: '게시물 2', content: '내용없음', name: '투게더', date: '25.08.01' },
    { id: '5', type: 'notice', title: '게시물 3', content: '내용없음', name: '투게더', date: '25.08.01' },
    { id: '6', type: 'notice', title: '게시물 4', content: '내용없음', name: '투게더', date: '25.08.01' },
  ];

  return (
    <>
      {/* 공지 부분은 하드코딩 */}
      <ul>
        <li className="border-b-1 border-b-gray-250">
          <div className="flex gap-7 my-4">
            <span>공지</span>
            <Link href={`/community/notice/1`}>
              <span className="font-bold">투게더 교환 및 반품 안내</span>
            </Link>
          </div>
          <div className="flex gap-4 text-sm">
            <span>투게더</span>
            <span>25.08.01</span>
          </div>
        </li>
        <li className="border-b-1 border-b-gray-250">
          <div className="flex gap-7 my-4">
            <span>공지</span>
            <Link href={`/community/notice/2`}>
              <span className="font-bold">배송 안내</span>
            </Link>
          </div>
          <div className="flex gap-4 text-sm">
            <span>투게더</span>
            <span>25.08.01</span>
          </div>
        </li>
      </ul>
      <ul className="mb-25">
        {/* 게시판 목록 */}
        {posts.map((post) => (
          <li key={post.id} className="border-b-1 border-b-gray-250">
            <div className="flex gap-7 my-4">
              <span>{post.id}</span>
              <Link href={`/community/notice/${post.id}`}>
                <span>{post.title}</span>
              </Link>
            </div>
            <div className="flex gap-4 text-sm">
              <span>{post.name}</span>
              <span>{post.date}</span>
              <span>조회 0</span>
            </div>
          </li>
        ))}
      </ul>
      <Input id="search" label="검색" search={true} />
    </>
  );
}
