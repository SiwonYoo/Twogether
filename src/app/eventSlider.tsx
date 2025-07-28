'use client'; // 스와이퍼는 클라이언트 환경에서만 작동함
import Image from 'next/image';

// swiper 사용을 위한 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';

interface slideDataItmeProps {
  id: number;
  src: string;
  alt: string;
}

export default function EventSlider() {
  // 서버에서 받아오는 데이터를 구현하기 위한 더미데이터. 서버 연결이 필요하면 수정 예정
  const slideData: slideDataItmeProps[] = [
    {
      id: 1,
      src: '/images/event/event_5.png',
      alt: '오픈 기념 프리미엄 세일! 50% 할인 적용',
    },
    {
      id: 2,
      src: '/images/event/event_6.png',
      alt: '회원가입 이벤트  1만원 적립! 8월 31일 종료됩니다.',
    },
    {
      id: 3,
      src: '/images/event/event_7.png',
      alt: '회원 감사이벤트! 리뷰 작성시 쿠폰 증정합니다. 8월 31일 종료됩니다.',
    },
    {
      id: 4,
      src: '/images/event/event_8.png',
      alt: '맞춤 옷 추천! 스타일을 고르면 옷을 추천해드립니다! 8월 31일 종료됩니다.',
    },
  ];

  return (
    <>
      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]} // 모듈 등록, 아래 파일 사용시
          loop={true} // 슬라이드 루프
          spaceBetween={0} // 슬라이스 사이 간격
          slidesPerView={1} // 보여질 슬라이스 수
          // onSlideChange={() => console.log('slide change')}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          }}
        >
          {slideData.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <Link href={`/community/event/${slide.id}`}>
                  <Image src={slide.src} alt={slide.alt} className="w-full" width="469" height="216" />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
