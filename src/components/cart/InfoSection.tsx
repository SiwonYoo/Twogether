import InfoListItem from '@/components/cart/InfoListItem';

export default function InfoSection() {
  return (
    <section>
      <h2 className="font-bold mb-4">이용안내</h2>

      <article className="text-xs my-8">
        <h3 className="mb-2">장바구니 이용안내</h3>
        <ul className="flex flex-col gap-1 text-gray-350">
          <InfoListItem>
            해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.
          </InfoListItem>
          <InfoListItem>
            해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.
          </InfoListItem>
          <InfoListItem>선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</InfoListItem>
          <InfoListItem>[쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</InfoListItem>
          <InfoListItem>
            장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.
          </InfoListItem>
          <InfoListItem>
            파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.
          </InfoListItem>
        </ul>
      </article>
    </section>
  );
}
