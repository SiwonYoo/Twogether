'use client';
import Image from 'next/image';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSearchPosts } from '@/data/functions/post';
import { Post } from '@/types';

export default function EventSlider() {
  const [eventSilderState, setEventSilderState] = useState<Post[]>([]);

  useEffect(() => {
    async function EventSilderFetch() {
      const res = await getSearchPosts('event');
      if (res.ok === 0) {
        setEventSilderState([]);
      }

      if (res.ok === 1) {
        setEventSilderState(res.item);
      }
    }
    void EventSilderFetch();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 max-lg:hidden">
        {eventSilderState.slice(0, 3).map((slide) => (
          <Link key={slide._id} href={`/community/event/${slide._id}`}>
            <Image
              src={`/images/event/event_${slide._id}.png`}
              alt={slide.content}
              className="w-full"
              width="469"
              height="216"
            />
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:hidden">
        {eventSilderState.map((slide) => (
          <Link key={slide._id} href={`/community/event/${slide._id}`}>
            <Image
              src={`/images/event/event_${slide._id}.png`}
              alt={slide.content}
              className="w-full"
              width="469"
              height="216"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
