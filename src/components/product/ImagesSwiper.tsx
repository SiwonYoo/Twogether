'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Product } from '@/types/product';

interface ProductCardItemProps {
  data: Product[];
  height: string;
}

/**
 * 상품의 대표 이미지들을 슬라이드 형태로 보여주는 Swiper 컴포넌트입니다.
 *
 * - `swiper/react`를 사용하여 슬라이드를 구성합니다.
 * - 상품 리스트의 각 이미지(`mainImages`)를 순회하며 하나씩 출력합니다.
 * - 슬라이드는 루프되며, 한 번에 하나의 이미지만 보여줍니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {Product[]} props.data - 각 상품의 이미지 배열을 포함한 상품 리스트
 * @param {string} props.height - 이미지 컨테이너의 높이 (Tailwind 형식 문자열)
 *
 * @returns {JSX.Element} Swiper 기반 이미지 슬라이드 JSX
 */

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
