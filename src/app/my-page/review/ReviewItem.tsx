'use client';

import { deleteReview } from '@/data/actions/review';
import useUserStore from '@/stores/useUserStore';
import { User } from '@/types';
import { Review } from '@/types/review';
import { ChevronDown, ChevronUp, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewItemProps extends Review {
  handleDelete: (_id: number, loginUser: User) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ReviewItem({ handleDelete, _id, rating, user, content, createdAt, extra }: ReviewItemProps) {
  const [fullContent, setFullContent] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);

  const loginUser = useUserStore((state) => state.user) || null;

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
              <span>{user.name} 님</span>
              <span className="flex">{ratingStar}</span>
              <span className="flex-1 text-right text-sm text-gray-250">{createdAt}</span>
            </div>
            <p className="text-sm text-gray-250">
              키 {extra.height} | 몸무게 {extra.weight} | 사이즈 {extra.size}
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
                  댓글 {extra.comment?.length ?? 0}
                  {commentBox ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button className="inline-flex items-center gap-1" onClick={fillThumbsUp}>
                  도움돼요
                  <ThumbsUp size={16} fill={thumbsUp ? '#2E1F42' : 'none'} />
                </button>
              </div>
              <div>
                {loginUser && (
                  <>
                    <button>수정</button> |{' '}
                    <button
                      onClick={() => {
                        handleDelete(_id, loginUser);
                      }}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {extra.image && (
            <Image
              src={`${API_URL}/${extra.image}`}
              alt="리뷰 이미지"
              width={80}
              height={80}
              className="w-20 max-h-20 aspect-square object-cover rounded-md"
            />
          )}
        </div>
        <div>
          {commentBox &&
            extra.comment &&
            extra.comment.map((item, idx) => (
              <div key={idx} className="mt-2 pt-2 border-t-[.0625rem] border-gray-150 text-sm">
                <div className="flex items-center gap-1 mb-1">
                  <span>{item.user.name}님</span>
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
