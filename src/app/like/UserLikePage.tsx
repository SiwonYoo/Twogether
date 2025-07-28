import LinkButton from '@/components/common/LinkButton';
import ProductCardItem from '@/components/product/ProductCardItem';
import { getProducts } from '@/data/functions/shop';
import { Metadata } from 'next';
import { Judson } from 'next/font/google';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: '찜 - Twogether',
  openGraph: {
    title: '찜 - Twogether',
    description: '상품의 찜 페이지입니다.',
    url: '/like',
  },
};

export default async function UserLikePage() {
  const data = await getProducts();
  // 서버연결이 어려울때 나오는 컨포넌트
  if (data.ok === 0) {
    return (
      <div className="flex justify-center items-center flex-col bg-(--color-gray-150) p-6 rounded-2xl">
        <h2 className="font-bold text-2xl">고객님 죄송합니다</h2>
        <p className="mt-2">서버 이슈로 인해 찜한 상품을 불러오지 못했습니다</p>
        <p className="mt-2">조금 있다가 시도해주시길 바랍니다.</p>
        <p className="mt-2">Twogether 이용에 불편을 드려 죄송합니다.</p>
        <LinkButton href="/">홈 화면 바로가기</LinkButton>
      </div>
    );
  }

  const likedItems = data.item.filter((item) => item.extra.isLike === true);

  // 서버연결이 원할할때 나오는 컨포넌트
  return (
    <main className="mx-4">
      <h2 className={`font-bold text-4xl text-center ${JudsonFont.className}`}>LIKE</h2>
      {likedItems.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 mt-4">
          {likedItems.map((item) => (
            <ProductCardItem key={item._id} data={[item]} />
          ))}
        </ul>
      ) : (
        <div className="font-bold text-center py-8 bg-(--color-gray-150) rounded-2xl my-6 p-4">
          <p className="text-3xl mb-4">찜한 상품이 아직 없습니다.</p>
          <p className="text-gray-500">고객님이 찜하신 상품이 이곳에 표시됩니다.</p>
          <p className="text-gray-500 my-2">마음에 드는 상품을 찜해보세요!</p>
          <p className="text-gray-500">상품 상세 페이지에서 하트를 누르면 찜 목록에 담을 수 있어요.</p>
          <p className="text-gray-500 mb-4 mt-2">다양한 상품을 둘러보고 원하는 아이템을 저장해보세요.</p>
          <LinkButton href={`/shop/shortSleeve`}>상품 둘러보기</LinkButton>
        </div>
      )}
    </main>
  );
}
