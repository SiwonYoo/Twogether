'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Product } from '@/types/product';

interface ProductCardItemProps {
  data: Product[];
  height: string;
}

export default function ImagesSwiper({ data, height }: ProductCardItemProps) {
  return (
    <>
      <div className="swiper-container">
        <Swiper
          // modules={[Autoplay]} // 모듈 등록, 아래 파일 사용시
          loop={true} // 슬라이드 루프
          spaceBetween={0} // 슬라이스 사이 간격
          slidesPerView={1} // 보여질 슬라이스 수
          // onSlideChange={() => console.log('slide change')}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          // }}
        >
          {data.map((item, dataIndex) =>
            item.mainImages.map((img, index) => {
              return (
                <>
                  <SwiperSlide key={`${dataIndex}-${index}`}>
                    <div className={`h-[${height}]`}>
                      <Image
                        src={img.path}
                        alt={item.content === '' ? `${item.content}` : ''}
                        className="w-full h-full object-cover"
                        width="469"
                        height="216"
                        key={index}
                      />
                    </div>
                  </SwiperSlide>
                </>
              );
            })
          )}
        </Swiper>
      </div>
    </>
  );
}
