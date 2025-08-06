'use client';

import Input from '@/components/common/Input';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

/**
 * QnA 전용 검색 폼 컴포넌트
 * /my-page/qna/search 경로로 검색 결과를 이동시킵니다.
 */
export default function QnaSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');

  // URL에서 기존 검색어 있으면 초기값으로 설정
  useEffect(() => {
    const currentKeyword = searchParams.get('keyword') ?? '';
    setKeyword(currentKeyword);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (keyword.trim()) {
      params.set('keyword', keyword.trim());
    }

    // QnA 검색 페이지로 이동
    router.push(`/my-page/qna/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-8">
      <div className="flex-1">
        <Input
          id="search"
          label="검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          hideLabel
          placeholder="검색어 입력"
        />
      </div>
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}
