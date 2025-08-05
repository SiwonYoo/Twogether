'use client';

import { useEffect, useState } from 'react';
import { getUserPosts } from '@/data/functions/post';
import { Post } from '@/types/post';
import useUserStore from '@/stores/useUserStore';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 내 QnA 문의 목록을 보여주는 컴포넌트
 * - 로그인한 사용자의 QnA 게시글만 표시
 * - 페이지네이션 기능 포함 (한 페이지당 5개씩)
 */
export default function MyQnaList() {
  // 1. Zustand 스토어에서 사용자 정보 가져오기
  const { user, isLoggedIn } = useUserStore();

  // 2. 컴포넌트 상태 정의
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string>(''); // 에러 메시지

  // 3. 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 (1부터 시작)
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const limit = 5; // 한 페이지당 보여줄 게시글 수 (고정값)

  // 4. 페이지가 바뀔 때마다 데이터를 새로 가져오는 함수
  useEffect(() => {
    // 로그인 상태 체크: 로그인 안되어 있거나 토큰이 없으면 에러 표시
    if (!isLoggedIn || !user?.token?.accessToken) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return; // 함수 종료
    }

    // 토큰이 확실히 있는 경우에만 API 호출 (타입스크립트 에러 방지)
    const accessToken = user.token.accessToken;

    // 실제 게시글 데이터를 가져오는 비동기 함수
    const fetchPosts = async () => {
      setLoading(true); // 새로운 페이지 로딩 시작
      try {
        // API 호출: QnA 타입, 액세스 토큰, 현재 페이지, 한 페이지당 개수
        const res = await getUserPosts('qna', accessToken, currentPage, limit);

        if (res.ok) {
          // 성공: 게시글 목록과 페이지네이션 정보 업데이트
          setPosts(res.item);

          // API에서 pagination 정보 사용 (총 페이지 수)
          if (res.pagination) {
            setTotalPages(res.pagination.totalPages);
          }
          setError(''); // 에러 초기화
        } else {
          // 실패: 서버에서 온 에러 메시지 표시
          setError(res.message);
        }
      } catch (err) {
        // 네트워크 에러 등 예외 상황 처리
        setError('목록을 불러오는데 실패했습니다.');
      } finally {
        // 성공/실패 관계없이 로딩 상태 해제
        setLoading(false);
      }
    };

    fetchPosts(); // 함수 실행
  }, [user, isLoggedIn, currentPage]); // 의존성: 이 값들이 바뀌면 useEffect 재실행

  // 5. 페이지 이동 함수들

  // 특정 페이지로 이동 (페이지 번호 버튼 클릭시)
  const goToPage = (page: number) => {
    // 유효한 페이지 범위 체크 (1 ~ 총페이지수)
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 이전 페이지로 이동
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 6. 조건부 렌더링 (상황에 따라 다른 UI 표시)

  // 로딩 중일 때
  if (loading) {
    return <p className="text-center text-primary">로딩중...</p>;
  }

  // 에러가 발생했을 때
  if (error) {
    return <p className="text-center text-primary">{error}</p>;
  }

  // 게시글이 하나도 없을 때
  if (posts.length === 0) {
    return <p className="text-center text-primary">문의내역이 존재하지 않습니다.</p>;
  }

  // 7. 정상적인 목록 + 페이지네이션 렌더링
  return (
    <div>
      {/* 게시글 목록 */}
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post._id} className="border-b-1 border-b-gray-250">
            {/* 게시글 제목 (클릭하면 상세 페이지로 이동) */}
            <div className="flex gap-7 my-4">
              <Link href={`/my-page/qna/${post._id}`}>
                <span>{post.title}</span>
              </Link>
            </div>
            {/* 게시글 정보 (작성자, 작성일) */}
            <div className="flex gap-4 text-sm">
              <span>{post.user.name}</span>
              <span>{post.createdAt}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 (총 페이지가 1개보다 많을 때만 표시) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {/* 이전 버튼 (첫 페이지에서는 비활성화) */}
          <button onClick={goToPrevPage} disabled={currentPage === 1} className="cursor-pointer">
            <ChevronLeft />
          </button>

          {/* 페이지 번호 버튼들 (전체 페이지 수만큼 생성) */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded cursor-pointer text-sm ${
                currentPage === page
                  ? 'bg-primary text-white' // 현재 페이지는 파란색
                  : 'bg-white text-black hover:bg-gray-100' // 다른 페이지는 흰색
              }`}
            >
              {page}
            </button>
          ))}

          {/* 다음 버튼 (마지막 페이지에서는 비활성화) */}
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className="cursor-pointer">
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
