import Image from 'next/image';

export default function OrderItemCard() {
  return (
    <article className="flex flex-row px-2 py-3 gap-4 bg-[#ffffff] rounded-lg shadow">
      <Image
        src="/images/products/short-sleeve/01/detail-1.jpg"
        width="80"
        height="108"
        alt="상품 썸네일 이미지"
        className=""
      />
      <div className="flex flex-col w-full justify-between">
        <p>러블리민트 실크스킨 반팔 상하의 세트(남녀공용)</p>
        <div className="flex flex-row">
          <p className="grow">상품 금액</p>
          <p className="mr-4 line-through text-gray-550">56,900원</p>
          <p className="text-error">34,000원</p>
        </div>
      </div>
    </article>
  );
}
