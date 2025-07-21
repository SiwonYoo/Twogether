'use client';

import Input from '@/components/common/Input';
import ProductCard from '@/components/product/ProductCard';
import { SearchIcon, X } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react';

function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[] | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');

    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (recentSearches?.[0] !== searchValue.trim()) {
      if (recentSearches) {
        setRecentSearches([searchValue.trim(), ...recentSearches.filter((item) => item !== searchValue.trim())]);
      } else if (!recentSearches) {
        setRecentSearches([searchValue.trim()]);
      }
    }
    setCurrentValue(searchValue);
  };

  useEffect(() => {
    if (recentSearches) localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex">
        <div className="flex-1">
          <Input
            id="search"
            label="검색"
            hideLabel
            value={searchValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchValue(event.target.value);
            }}
          />
        </div>
        <button type="submit">
          <SearchIcon />
        </button>
      </form>

      <h2 className="mt-6 mb-4 font-bold">최근 검색어</h2>
      <div className="flex gap-1 max-w-full overflow-auto">
        {recentSearches &&
          recentSearches.map((item, idx) => {
            if (idx < 5)
              return (
                <div
                  key={idx}
                  className="flex gap-1 items-center w-fit px-3 py-1 rounded-2xl border-[1px] border-gray-250 text-sm"
                  onClick={() => {
                    setSearchValue(item);
                    setRecentSearches([
                      item.trim(),
                      ...recentSearches.filter((researchItem) => researchItem !== item.trim()),
                    ]);
                    setCurrentValue(item);
                  }}
                >
                  <span className="max-w-15 truncate text-nowrap">{item}</span>
                  <button
                    onClick={(evnet) => {
                      evnet.stopPropagation();
                      setRecentSearches(recentSearches.filter((researchItem) => researchItem !== item));
                    }}
                  >
                    <X size={16} color="var(--color-gray-350)" />
                  </button>
                </div>
              );
          })}
      </div>

      <div hidden={!currentValue}>
        <h2 className="mt-6 mb-4 font-bold">
          &apos;{currentValue}&apos; 검색 결과 <span className="text-secondary-2">16</span>
        </h2>
        {/* API 정보를 ProductCard에 넘기기 */}
        <div>{<ProductCard />}</div>
      </div>
    </>
  );
}

export default SearchForm;
