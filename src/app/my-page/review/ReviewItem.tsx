'use client';

import { ChevronDown, ChevronUp, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CommentItem {
  _id: number;
  user: string;
  content: string;
  createdAt: string;
}

export interface ReviewItemProps {
  _id: number;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
  height: string;
  weight: string;
  size: 'FREE' | 'S' | 'M' | 'L';
  comment?: CommentItem[];
  image: string;
}

function ReviewItem({ userName, rating, content, createdAt, height, weight, size, comment, image }: ReviewItemProps) {
  const [fullContent, setFullContent] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);

  const showFullContent = () => {
    setFullContent(!fullContent);
  };

  const showComment = () => {
    setCommentBox(!commentBox);
  };

  const fillThumbsUp = () => {
    setThumbsUp(!thumbsUp);
  };

  const ratingStar: React.ReactElement[] = [];
  const fillStar = rating;

  for (let i = 0; i < 5; i++) {
    ratingStar.push(
      i < fillStar ? (
        <Star key={i} size={16} color="#2E1F42" fill="#2E1F42" />
      ) : (
        <Star key={i} size={16} color="#2E1F42" />
      )
    );
  }

  return (
    <>
      <div className="p-4 rounded-md border-[.0625rem] border-gray-150">
        <div className="flex justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span>{userName} 님</span>
              <span className="flex">{ratingStar}</span>
              <span className="flex-1 text-right text-sm text-gray-250">{createdAt}</span>
            </div>
            <p className="text-sm text-gray-250">
              키 {height} | 몸무게 {weight} | 사이즈 {size}
            </p>
            {content.length > 20 ? (
              <div className="flex my-2" onClick={showFullContent}>
                <span className={`${fullContent ? '' : 'overflow-hidden text-ellipsis line-clamp-2'}`}>{content}</span>
              </div>
            ) : (
              <p className="my-2">{content}</p>
            )}
            <div className="flex justify-between text-sm">
              <div>
                <button className="inline-flex items-center gap-1 mr-2" onClick={showComment}>
                  댓글 {comment?.length ?? 0}
                  {commentBox ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button className="inline-flex items-center gap-1" onClick={fillThumbsUp}>
                  도움돼요
                  <ThumbsUp size={16} fill={thumbsUp ? '#2E1F42' : 'none'} />
                </button>
              </div>
              <div>
                <button>수정</button> | <button>삭제</button>
              </div>
            </div>
          </div>
          <Image
            src={image}
            alt="리뷰 이미지"
            width={80}
            height={80}
            className="w-20 max-h-20 aspect-square object-cover rounded-md"
          />
        </div>
        <div>
          {commentBox &&
            comment?.map((item) => (
              <div key={item._id} className="mt-2 pt-2 border-t-[.0625rem] border-gray-150 text-sm">
                <div className="flex items-center gap-1 mb-1">
                  <span>{item.user} 님</span>
                  <span className="flex-1 text-right  text-gray-250">{item.createdAt}</span>
                </div>
                <p>{item.content}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ReviewItem;
