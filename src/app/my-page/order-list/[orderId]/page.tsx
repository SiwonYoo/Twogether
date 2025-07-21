import { orderList } from '@/app/my-page/order-list/dummydata';
import LinkButton from '@/components/common/LinkButton';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '주문 상세 조회 - Twogether',
  openGraph: {
    title: '주문 상세 조회 - Twogether',
    description: '주문 상세 조회',
    url: '/my-page/order-list/[orderId]',
  },
};

async function OrderListDetail({ params }: { params: Promise<{ orderId: number }> }) {
  const { orderId } = await params;

  /* 데이터 가져오는 로직으로 수정하기 */
  const data = orderList[orderId - 1];

  return (
    <>
      <main className="mx-4">
        <div className="flex flex-col gap-4 mb-20">
          <section>
            <p className="mb-4">배송지</p>
            <div className="flex flex-col gap-1 p-5 rounded-lg border-[.0625rem] border-gray-150 text-sm">
              {/* user_id로 user 정보 받아오기 */}
              <p>
                <span className="mr-1">김멋사</span>
                <span>010-0000-0000</span>
              </p>
              <p className="mb-4">{data.address.value}</p>
              {/* 배송 메모는 API에 없으니 확인해보기 */}
              <p>배송 메모</p>
              <div className="rounded-lg border-[.0625rem] border-gray-150 p-2 text-gray-350">
                <p>문 앞에 두고 가주세요.</p>
              </div>
            </div>
          </section>
          <section>
            <p className="mb-4">
              주문 상품 <span>{data.products.length}</span>개
            </p>
            <div className="flex flex-col gap-4 p-5 rounded-lg border-[.0625rem] border-gray-150 text-sm">
              {data.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 justify-between items-center pb-4 border-b-[.0625rem] border-gray-150"
                >
                  <Image
                    src={item.image}
                    width={50}
                    height={50}
                    alt={item.name}
                    className="aspect-square object-cover"
                  />
                  <div className="flex-1">
                    <p className="mb-1">{item.name}</p>
                    <div className="flex justify-between text-sm">
                      <span>상품 금액</span>
                      <p>
                        <s>
                          <span className="text-gray-350">{item.price}원</span>
                        </s>
                        <span className="ml-1 text-error">{item.price}원</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="flex flex-col gap-4 py-4 border-b-[.0625rem] border-gray-150">
              <div className="flex justify-between">
                <span>총 상품 금액</span>
                <span>{data.cost.products.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>총 배송비</span>
                <span>{data.cost.shippingFees.toLocaleString()}원</span>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>총 할인 금액</span>
                  <span>{data.cost.discount.products.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-gray-350 text-sm">
                  <span>- 기간할인</span>
                  <span>{data.cost.discount.products.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          </section>
          <div className="flex justify-between mb-5">
            <span>결제 금액</span>
            <span>{data.cost.total.toLocaleString()}원</span>
          </div>
          <LinkButton href="/my-page/order-list" size="lg">
            뒤로 가기
          </LinkButton>
        </div>
      </main>
    </>
  );
}

export default OrderListDetail;
