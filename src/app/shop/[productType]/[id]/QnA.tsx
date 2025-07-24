import { ProductDetails } from "@/types/product";
import { Judson } from "next/font/google"; // 구글 폰트 사용
import Link from "next/link";

const JudsonFont = Judson({
  subsets: ["latin"],
  weight: "700",
});

interface userDataProp {
  _id: number;
  title: string;
  user: string;
  date: string;
  view: number;
}
interface AdminDataProp {
  _id: number;
  title: string;
  user: string;
  date: string;
  view: number;
}

export default function QnA({ productType, id, item }: ProductDetails) {
  const userData: userDataProp[] = [
    { _id: 5, title: "문의 드립니다", user: "홍길동", date: "25.08.03", view: 100 },
    { _id: 4, title: "문의 드립니다", user: "홍길동", date: "25.08.03", view: 100 },
    { _id: 3, title: "문의 드립니다", user: "홍길동", date: "25.08.01", view: 100 },
    { _id: 2, title: "문의 드립니다", user: "홍길동", date: "25.08.03", view: 100 },
    { _id: 1, title: "문의 드립니다", user: "홍길동", date: "25.08.01", view: 100 },
  ];

  const adminData: AdminDataProp[] = [
    { _id: 1, title: "투게더 교환 및 반품 안내", user: "투게더", date: "25.08.01", view: 2 },
    { _id: 2, title: "투게더 배송안내", user: "투게더", date: "25.08.01", view: 2 },
  ];

  return (
    <>
      <h2 className={`${JudsonFont.className} text-center font-bold text-2xl`}>Q&A</h2>
      <ul>
        {/* 공지 */}
        {adminData.map((item) => {
          return (
            <li key={item._id} className="border-b border-(--color-gray-250) my-4">
              <Link href={`/community/notice/${item._id}`}>
                <div className="flex gap-4">
                  <p>공지</p>
                  <p className="font-bold ">{item.title}</p>
                </div>
                <div className="flex gap-4 my-2">
                  <p>{item.user}</p>
                  <p>{item.date}</p>
                  <p>조회: {item.view}</p>
                </div>
              </Link>
            </li>
          );
        })}

        {userData.map((item) => {
          return (
            <li key={item._id} className="border-b  border-(--color-gray-250) my-4">
              <Link href={`/my-page/qna/${item._id}`}>
                <div>
                  <p>{item.title}</p>
                </div>
                <div className="flex gap-4 my-2">
                  <h3>{item.user.length > 1 ? item.user[0] + "*".repeat(item.user.length - 1) : item.user}</h3>
                  <p>{item.date}</p>
                  <p>조회: {item.view}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
