import { Product } from "@/types/product";
import { Metadata } from "next";
import { Judson } from "next/font/google"; // 구글 폰트 사용
import Image from "next/image";

const JudsonFont = Judson({
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "상품 상세페이지 - Twogether",
  openGraph: {
    title: "상품 상세페이지 - Twogether",
    description: "코튼캔디 순면 반팔 상하의 세트 - Twogether",
    url: "/shop/shortSleeve/11212",
  },
};

interface OverviewProps {
  productType: string;
  id: string;
  item: Product;
}

export default function OverviewPage({ productType, id, item }: OverviewProps) {
  return (
    <>
      <div>
        <h2 className={`${JudsonFont.className} font-bold text-4xl text-center text-(--color-primary)`}>Twogether</h2>
        <p className="text-center my-4">{item.content}</p>
        <Image src={`/images/products/${productType}/${id}/model-${item._id}.jpg`} alt={item.content} width="1000" height="1197" />
        <div className="my-6">
          <h3 className="mb-4">{item.name}</h3>
          <p>{item.content}</p>
        </div>
        <Image src={`/images/products/${productType}/${id}/model-${item._id + 1}.jpg`} alt={item.content} width="1000" height="1197" />
        <Image src={`/images/products/${productType}/${id}/model-${item._id + 2}.jpg`} alt={item.content} width="1000" height="1197" />
        <Image src={`/images/products/${productType}/${id}/model-${item._id + 3}.jpg`} alt={item.content} width="1000" height="1197" />
      </div>
    </>
  );
}
