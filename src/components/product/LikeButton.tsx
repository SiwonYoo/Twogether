'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function LikeButton() {
  const [state, setState] = useState(false);

  const btnClick = () => {
    setState(!state);
    console.log('제품 찜 완료');
  };

  return (
    <>
      <button onClick={btnClick}>
        <Heart fill={state ? '#F44336' : 'none'} stroke={state ? 'none' : '#F44336'} />
      </button>
    </>
  );
}
