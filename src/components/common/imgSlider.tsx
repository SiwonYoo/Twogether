'use client'; // 스와이퍼는 클라이언트 환경에서만 작동함
import Image from 'next/image';

// swiper 사용을 위한 임포트
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Product } from '@/types';

interface imagesUrlProps {
  data: Product;
}

export default function ImgSlider({ data }: imagesUrlProps) {
  return (
    <>
      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]} // 모듈 등록, 아래 파일 사용시
          loop={true} // 슬라이드 루프
          spaceBetween={0} // 슬라이스 사이 간격
          slidesPerView={1} // 보여질 슬라이스 수
          autoplay={{
            delay: 1000 * 5,
            disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          }}
        >
          {data.mainImages.map((slide) => {
            return (
              <SwiperSlide key={slide._id}>
                <Image src={slide.path} alt={slide.name} className="w-full" width="469" height="216" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
