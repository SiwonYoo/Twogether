'use client';

import LinkButton from '@/components/common/LinkButton';
import ProductCardItem from '@/components/product/ProductCardItem';
import useUserStore from '@/stores/useUserStore';
import { Product } from '@/types';
import { redirect } from 'next/navigation';

interface LikePageApiProps {
  item: Product[];
}

export default function LikePageApi({ item }: LikePageApiProps) {
  const user = useUserStore((state) => state.user);
  const likedItems = item.filter((item) => item.extra.isLike === true);
  return (
    <>
      {user ? (
        <>
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
        </>
      ) : (
        confirm('로그인을 하셔야 이용가능합니다. 로그인 하시겠습니까?') && redirect('/login')
      )}
    </>
  );
}
