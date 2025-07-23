'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function LikeButton() {
  const [state, setState] = useState(false);
  const [likeText, setLikeText] = useState(true);

  const btnClick = () => {
    setState(!state);
    setLikeText(!likeText);
    console.log('제품 찜 완료');
  };

  if (likeText === false) {
    setTimeout(() => {
      setLikeText(!likeText);
    }, 1500);
  }

  return (
    <>
      <button onClick={btnClick}>
        <Heart fill={state ? '#F44336' : 'none'} stroke={state ? 'none' : '#F44336'} />
      </button>
      <div
        className="absolute left-1/2 -top-[2.5rem] w-full -translate-x-1/2 bg-(--color-white) p-2 rounded-2xl shadow-2xl"
        hidden={likeText}
      >
        {state === true ? <p>찜 완료!</p> : <p>찜 삭제</p>}
      </div>
    </>
  );
}
