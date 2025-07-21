import SearchMain from '@/app/search/SearchMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상품 검색 - Twogether',
  openGraph: {
    title: '상품 검색 - Twogether',
    description: '상품 검색',
    url: '/search',
  },
};

function Search() {
  return (
    <>
      <main className="px-4">
        <SearchMain />
      </main>
    </>
  );
}

export default Search;
