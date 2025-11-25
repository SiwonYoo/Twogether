'use client';

import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

export function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = throttle(() => setWidth(window.innerWidth));
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return width;
}
