import ProductSelect from "@/app/shop/[productType]/[id]/ProductSelect";
import ProductTabs from "@/app/shop/[productType]/[id]/ProductTabs";
import ImgSlider from "@/components/common/imgSlider";

interface ProductCardItemProps {
  params: Promise<{
    productType: string;
    id: string;
  }>;
}

export default async function ProductDetilPage({ params }: ProductCardItemProps) {
  const { productType, id } = await params;
  const numericId = Number(id);
  console.log(id);

  const data = [
    {
      _id: 1,
      price: 12000,
      shippingFees: 2500,
      show: true,
      active: true,
      name: "뉴라오 스크런치 다크오렌지 (32수)",
      quantity: 200,
      buyQuantity: 198,
      mainImages: [
        {
          _id: 1,
          path: "/images/products/acc/1/model-1.jpg",
          name: "model-1.jpg",
          originalname: "뉴라오 스크런치 다크오렌지 (32수).jpg",
        },
        {
          _id: 2,
          path: "/images/products/acc/1/model-2.jpg",
          name: "model-2.jpg",
          originalname: "뉴라오 스크런치 다크오렌지 (32수).jpg",
        },
        {
          _id: 3,
          path: "/images/products/acc/1/model-3.jpg",
          name: "model-3.jpg",
          originalname: "뉴라오 스크런치 다크오렌지 (32수).jpg",
        },
      ],
      content: "32수 슬럽평직 원단을 사용하여 눈에 보이는 원단감이 부드럽고 피부에 닿는 촉감이 부드러우며 쾌적하고 편한한 착용감을 유지해줍니다",
      extra: {
        isBest: true,
        isSale: false,
        category: "acc",
        isLike: false,
        size: [{ value: "FREE", text: "FREE" }],
        SizeInfo: [
          {
            headers: ["스크런치", "외경"],
            values: ["FREE(cm)", "20"],
          },
        ],
        FabricInfo: [
          {
            label: "두께감",
            values: ["얇음", "중간", "다소두꺼움"],
            selected: ["얇음"],
          },
          {
            label: "원단",
            values: ["면", "폴리에스테르", "코마사"],
            selected: ["면"],
          },
        ],
        washingInfo: [
          {
            _id: 1,
            label: "미온수 세탁 및 약하게 단독 세탁",
          },
          {
            _id: 2,
            label: "건조기 사용 금지, 형태가 변형될 수 있음",
          },
          {
            _id: 3,
            label: "짙은 색상은 물 빠짐이 있을 수 있으니 밝은 색상과 분리 세탁",
          },
          {
            _id: 4,
            label: "옷걸이에 걸어 그늘에 건조, 진한 색상의 경우 세탁 후 즉시 탈수 및 건조",
          },
          {
            _id: 5,
            label: "염소 및 표백제 사용 금지, 변색될 수 있음",
          },
          {
            _id: 6,
            label: "취급 부주의로 인한 탈색 및 오염, 형태 변질 및 수축된 제품은 보상 불가",
          },
        ],
      },
    },
  ];

  return (
    <>
      <div className="h-[650px] overflow-hidden">
        <ImgSlider productType={productType} id={numericId} />
      </div>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="mt-4 mb-2">{item.price}</p>
            <p>여기 세일 금액</p>
            <p className="mt-2 mb-4">
              <span>적립금: </span>
              <span>{Math.floor(item.price * 0.02)} (2%) </span>
            </p>
            <p>
              <span>배송금: </span>
              <span>
                {item.shippingFees}원{" (50,000원 이상 구매시 무료 배송)"}
              </span>
            </p>
            <ProductSelect item={item} key={index} />

            <ProductTabs productType={productType} id={id} item={item} />
          </div>
        );
      })}
    </>
  );
}
