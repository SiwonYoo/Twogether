'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getUserPosts } from '@/data/functions/post';
import { Post } from '@/types/post';
import useUserStore from '@/stores/useUserStore';
import SearchForm from '@/components/post/QnaSearchForm';
import QnaSearchList from '@/components/post/QnaSearchList';

/**
 * 1:1문의 검색 클라이언트 컴포넌트
 * 로그인한 사용자가 작성한 문의글을 검색할 수 있습니다.
 */
export default function QnaSearchClient() {
  const searchParams = useSearchParams();
  const { user } = useUserStore();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const keyword = searchParams.get('keyword') || '';

  // 검색 실행
  useEffect(() => {
    const fetchSearchResults = async () => {
      // 로그인 상태 확인
      if (!user?.token?.accessToken) {
        setError('로그인이 필요합니다.');
        return;
      }

      // 검색어가 없으면 실행하지 않음
      if (!keyword.trim()) {
        setPosts([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const queryParams = new URLSearchParams({
          type: 'qna',
          page: '1',
          limit: '100',
          ...(keyword && { keyword }),
        });

        const res = await getUserPosts('qna', user.token.accessToken, 1, 100, keyword);

        if (res.ok) {
          const userPosts = res.item.filter((post) => post.user._id === user._id);
          setPosts(userPosts);
        } else {
          setError(res.message || '검색에 실패했습니다.');
          setPosts([]);
        }
      } catch (err) {
        setError('검색 중 오류가 발생했습니다.');
        setPosts([]);
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword, user]);

  // 로딩 상태
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>검색 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 제목 */}
      <h2 className="text-2xl font-bold mb-6">1:1 문의 검색</h2>

      {/* QnA 전용 검색 폼 */}
      <div className="mb-8">
        <SearchForm />
      </div>

      {/* 검색어 표시 */}
      {keyword && (
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-black">{keyword}</span> 검색 결과
          </p>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* 검색 결과 */}
      {!error && keyword && <QnaSearchList posts={posts} />}

      {/* 검색어가 없을 때 안내 메시지 */}
      {!keyword && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">검색어를 입력해주세요.</p>
        </div>
      )}
    </div>
  );
}
