'use client';

import SearchResult from '@/app/search/SeachResult';
import Input from '@/components/common/Input';
import { getProducts } from '@/data/functions/shop';
import { Product } from '@/types';

import { SearchIcon, X } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react';

function SearchForm() {
  const [inputValue, setInputValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[] | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Product[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');

    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (recentSearches) localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      let searchValue = currentValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      searchValue = searchValue.split(' ').join('|');

      const customQuery = encodeURIComponent(
        JSON.stringify({
          $or: [{ name: { $regex: searchValue, $options: 'i' } }, { content: { $regex: searchValue, $options: 'i' } }],
        })
      );
      const result = await getProducts(customQuery);

      if (result.ok && result.item) setSearchResult(result.item);
      else console.error();
      setLoading(false);
    };
    searchProducts();
  }, [currentValue]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedValue = inputValue.replace(/\s+/g, ' ').trim();

    setInputValue(trimmedValue);
    if (trimmedValue === '') return;

    if (recentSearches?.[0] !== inputValue) {
      const filtered = recentSearches?.filter((item, idx) => item !== trimmedValue) || [];
      const limited = filtered.slice(0, 4);
      setRecentSearches([trimmedValue, ...limited]);
    }

    setCurrentValue(trimmedValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex">
        <div className="flex-1">
          <Input
            id="search"
            label="검색"
            hideLabel
            value={inputValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setInputValue(event.target.value);
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
                    setInputValue(item);
                    setRecentSearches([item, ...recentSearches.filter((researchItem) => researchItem !== item)]);
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
          &apos;{currentValue}&apos; 검색 결과{' '}
          {!loading && <span className="text-secondary-2">{searchResult?.length}</span>}
        </h2>
        <div>
          {loading ? (
            <p className="text-center">검색 중입니다.</p>
          ) : searchResult?.length === 0 ? (
            <p className="text-center">검색 결과가 없습니다.</p>
          ) : (
            searchResult && <SearchResult data={searchResult} />
          )}
        </div>
      </div>
    </>
  );
}

export default SearchForm;
