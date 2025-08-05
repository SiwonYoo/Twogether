'use client';

import { useEffect, useState } from 'react';
import EventList from '@/app/community/EventList';
import NoticeList from '@/app/community/NoticeList';
import SearchForm from '@/components/common/SearchForm';
import { getPost, getPosts } from '@/data/functions/post';
import { Post } from '@/types/post';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CommunityPageProps {
  boardType: string; // 'notice' 또는 'event'
}

/**
 * 커뮤니티 페이지 컴포넌트 (공지사항/이벤트)
 * - notice: 최신 2개 게시글을 상단에 고정, 나머지는 일반 목록
 * - event: 모든 게시글을 일반 목록으로 표시
 * - 페이지네이션 기능 포함
 */
export default function CommunityPage({ boardType }: CommunityPageProps) {
  // 1. 상태 관리
  const [posts, setPosts] = useState<Post[]>([]); // 현재 페이지 게시글
  const [pinnedPosts, setPinnedPosts] = useState<Post[]>([]); // 고정 공지사항 (항상 표시)
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string>(''); // 에러 메시지

  // 2. 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const limit = 5; // 한 페이지당 10개씩 표시

  // 3. 게시판 타입 체크
  const isNoticeBoard = boardType === 'notice';
  const isEventBoard = boardType === 'event';

  // 4. 컴포넌트 마운트 시 고정 공지사항 가져오기 (공지사항 게시판일 때만)
  useEffect(() => {
    if (isNoticeBoard) {
      const fetchPinnedPosts = async () => {
        try {
          // _id가 1, 2인 게시글을 따로 가져오기 (항상 고정 표시용)
          const res1 = await getPost(1);
          const res2 = await getPost(2);

          const pinned: Post[] = [];
          if (res1.ok) pinned.push(res1.item);
          if (res2.ok) pinned.push(res2.item);

          setPinnedPosts(pinned);
        } catch (err) {
          console.error('고정 공지사항 로딩 실패:', err);
        }
      };

      fetchPinnedPosts();
    }
  }, [isNoticeBoard]); // 게시판 타입이 바뀔 때만 실행

  // 5. 페이지 변경 시 일반 게시글 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // API 호출 (페이지네이션 파라미터 포함)
        const res = await getPosts(boardType, currentPage, limit);

        if (res.ok) {
          setPosts(res.item);

          // 페이지네이션 정보 설정
          if (res.pagination) {
            setTotalPages(res.pagination.totalPages);
          }
          setError('');
        } else {
          setError(res.message);
          setPosts([]);
        }
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [boardType, currentPage, isNoticeBoard]); // boardType이나 currentPage가 바뀌면 재실행

  // 6. 페이지 이동 함수들
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // 페이지 변경 시 맨 위로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 7. 조건부 렌더링
  if (loading) {
    return (
      <div className="text-center py-8">
        <p>게시글을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // 8. 메인 렌더링
  return (
    <>
      <ul className="mb-25">
        {/* 공지사항: 고정 공지사항 (_id 1, 2번 게시글 - 항상 표시) */}
        {isNoticeBoard && pinnedPosts.length > 0 && (
          <>
            {pinnedPosts.map((post) => (
              <NoticeList key={`pinned-${post._id}`} post={post} boardType={boardType} isNotice={true} />
            ))}
          </>
        )}

        {/* 공지사항 게시글 목록  */}
        {isNoticeBoard && posts.length > 0 && (
          <>
            {posts.map((post) => (
              <NoticeList key={`regular-${post._id}`} post={post} boardType={boardType} isNotice={false} />
            ))}
          </>
        )}

        {/* 이벤트 게시글 목록 */}
        {isEventBoard && posts.length > 0 && (
          <>
            {posts.map((post, i) => (
              <EventList key={post._id} post={post} boardType={boardType} />
            ))}
          </>
        )}

        {/* 게시글이 없을 때 */}
        {posts.length === 0 && !loading && (
          <li className="text-center py-8">
            <p>등록된 게시글이 없습니다.</p>
          </li>
        )}
      </ul>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-6">
          {/* 이전 버튼 */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>

          {/* 페이지 번호들 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? 'bg-primary text-white' : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          {/* 다음 버튼 */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* 검색 폼 */}
      <div className="mb-20">
        <SearchForm />
      </div>
    </>
  );
}
