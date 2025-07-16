'use client'; // 스와이퍼는 클라이언트 환경에서만 작동함
import Image from 'next/image';

// swiper 사용을 위한 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface slideDataItmeProps {
  id: number;
  src: string;
  alt: string;
}



export default function ImgSlider() {
  // 서버에서 받아오는 데이터를 구현하기 위한 더미데이터. 서버 연결이 필요하면 수정 예정
  const slideData: slideDataItmeProps[] = [
    {
      id: 1,
      src: '/images/products/long-sleeve/02/model-2.jpg',
      alt: '',
    },
    {
      id: 2,
      src: '/images/products/long-sleeve/02/model-3.jpg',
      alt: '',
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
          onSlideChange={() => console.log('slide change')}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          }}
        >
          {slideData.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <Image src={slide.src} alt={slide.alt} className="w-full" width="469" height="216" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
