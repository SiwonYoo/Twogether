import Button from '@/components/common/Button';
import LinkButton from '@/components/common/LinkButton';
import { OrderProduct } from '@/types/order';
import { Judson } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

interface OrderSummaryCardProps {
  _id: number;
  date: string;
  products: OrderProduct[];
}

function OrderSummaryCard({ _id, date, products }: OrderSummaryCardProps) {
  return (
    <>
      <div>
        <div className="flex justify-between items-center py-4">
          <h3 className={`text-2xl ${JudsonFont.className}`}>{date}</h3>
          <Link href={`/my-page/order-list/${_id}`} className="hover:underline">
            주문상세
          </Link>
        </div>
        {products.map((item) => (
          <div key={item._id} className="flex flex-col gap-4 py-4 border-b-[.0625rem] border-gray-150">
            <div className="flex">
              <Image
                src={item.image.path}
                width={100}
                height={100}
                alt={item.name}
                className="aspect-square object-cover"
              ></Image>
              <div className="flex flex-col justify-between pl-4 w-full min-w-0">
                <div className="flex flex-col flex-1">
                  <p className="truncate">{item.name}</p>
                  <p className="text-sm text-gray-350">사이즈 {item.extra.size[0].text}</p>
                </div>
                <p className="text-lg text-right font-bold w-full">{item.price.toLocaleString()}원</p>
              </div>
            </div>
            <div className="flex gap-4">
              {/* 주문 취소 페이지로 이동 후 취소: LinkButton 또는 바로 취소: Button */}
              <Button shape="square" size="lg" bg="white">
                주문취소
              </Button>
              <LinkButton
                href={`/my-page/order-list/${_id}/${item._id}/review-post`}
                shape="square"
                size="lg"
                bg="light"
              >
                리뷰작성
              </LinkButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderSummaryCard;
