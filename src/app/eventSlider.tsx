'use client'; // 스와이퍼는 클라이언트 환경에서만 작동함
import Image from 'next/image';

// swiper 사용을 위한 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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
      <div className="swiper-container overflow-hidden">
        <Swiper
          modules={[Autoplay]} // 모듈 등록, 아래 파일 사용시
          loop={true} // 슬라이드 루프
          spaceBetween={0} // 슬라이스 사이 간격
          slidesPerView={1} // 보여질 슬라이스 수
          autoplay={{
            delay: 1000 * 10,
            disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          }}
        >
          {eventSilderState.map((slide) => {
            return (
              <SwiperSlide key={slide._id}>
                <Link href={`/community/event/${slide._id}`}>
                  <Image
                    src={`/images/event/event_${slide._id}.png`}
                    alt={slide.content}
                    className="w-full"
                    width="469"
                    height="216"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
