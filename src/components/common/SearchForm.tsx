'use client';

import Input from '@/components/common/Input';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState('');

  // URL에서 기존 검색어 있으면 초기값으로 설정
  useEffect(() => {
    // null 이나 undefined일 경우 빈값 아니면 setKeyword 값
    const currentKeyword = searchParams.get('keyword') ?? '';
    setKeyword(currentKeyword);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set('keyword', keyword.trim());
    } else {
      params.delete('keyword');
    }
    router.push(`?${params.toString()}`);
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
