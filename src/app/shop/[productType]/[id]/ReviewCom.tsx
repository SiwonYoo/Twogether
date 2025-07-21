import Input from '@/components/common/Input';
import { ChevronDown, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

interface dataProps {
  _id: number;
  user: string;
  contant: string;
  star: string;
  length: string;
  Weight: string;
  size: string;
  deta: string;
  src: string;
}

interface CommentsProps {
  _id: number;
  user: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ReviewItmeProps {
  data: dataProps[];
  Comments: CommentsProps[];
  likeToggle: boolean;
  likeToggleBtn: (likeToggle?: boolean) => void;
  toggle: boolean;
  openToggle: (toggle?: boolean) => void;
}

export default function ReviewItme({ data, Comments, likeToggle, likeToggleBtn, toggle, openToggle }: ReviewItmeProps) {
  return (
    <>
      {data.map((item) => {
        return (
          <li className="border border-(--color-gray-250) rounded-2xl p-4" key={item._id}>
            <div className="flex justify-between items-center gap-4">
              {/* 구메자 정보, 상품 리뷰 */}
              <div className="flex justify-between flex-col">
                {/* 이름 별점 날짜 */}
                <div className="flex justify-between items-center w-full ">
                  <div className="flex gap-4">
                    <h3 className="font-bold">
                      {item.user.length > 1 ? item.user[0] + '*'.repeat(item.user.length - 1) : item.user}
                    </h3>
                    <span className="flex">
                      {Array.from({ length: Number(item.star) }).map((_, idx) => (
                        <Star key={idx} fill="var(--color-primary)" width="1rem" />
                      ))}
                    </span>
                  </div>
                  <p className="text-(--color-gray-250)">{item.deta}</p>
                </div>

                {/* 사용자의 신체 정보 */}
                <div className="flex items-center w-full gap-4 mt-2 text-(--color-gray-250)">
                  <p>{item.length}</p>
                  {' | '}
                  <p>{item.Weight}</p>
                  {' | '}
                  <p>{item.size}</p>
                </div>

                {/* 상품 리뷰 */}
                <div className="min-[100px]:w-[50px] min-[150px]:w-[75px] min-[300px]:w-[200px] sm:w-[300px] md:w-[550px]">
                  <div className="w-full my-6 truncate">{item.contant}</div>
                </div>

                {/* 댓글, 좋아요 컨포넌트 */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <button className="flex" onClick={() => openToggle()}>
                        댓글{' '}
                        <ChevronDown
                          fill="var(--color-primary)"
                          stroke="var(--color-primary)"
                          className={`${toggle ? '' : 'rotate-180'}`}
                        />
                      </button>
                    </div>
                    <button onClick={() => likeToggleBtn()} className="flex gap-1">
                      <p>도움돼요</p>
                      <ThumbsUp
                        fill={likeToggle ? 'var(--color-primary)' : 'none'}
                        stroke={likeToggle ? 'none' : 'var(--color-primary)'}
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => console.log('수정 완료')}>수정</button>
                    <button onClick={() => console.log('삭제 완료')}>삭제</button>
                  </div>
                </div>
              </div>
              {/* 상품 이미지 */}
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={item.src}
                  width="1000"
                  height="1000"
                  alt={`${item.user}의 리뷰 사진입니다.`}
                  // className="w-[8.125rem] h-full"
                />
              </div>
            </div>
            <div hidden={toggle}>
              <Input id="name" label="" />
              <ul>
                {Comments.map((item) => {
                  return (
                    <li key={item._id} className="my-4">
                      <div className="flex justify-between my-2">
                        <p>{item.user}</p>
                        <p className="text-(--color-gray-250)">{item.createdAt}</p>
                      </div>
                      <p>{item.content}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </>
  );
}
