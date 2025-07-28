'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ReviewImagesModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  images: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ReviewImagesModal({ isOpen, setOpen, images }: ReviewImagesModalProps) {
  const [imageIdx, setImageIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      <div
        hidden={!isOpen}
        className="fixed flex h-dvh min-w-[400px] max-w-[768px] mx-auto inset-0 justify-center items-center bg-black/70 z-10"
      >
        <div role="dialog" className="flex flex-col p-8 rounded-4xl z-10 animate-fade-in-scale">
          <div className="flex content-center w-full mb-5">
            <button
              onClick={() => {
                if (imageIdx > 0) setImageIdx((prev) => prev - 1);
              }}
              className="p-2"
            >
              {<ChevronLeft color={imageIdx > 0 ? 'white' : 'gray'} />}
            </button>
            <div className="relative">
              <Image
                src={`${API_URL}/${images[imageIdx]}`}
                alt="리뷰 이미지"
                width={240}
                height={240}
                className="w-60 h-60 object-cover"
              />
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="absolute top-0 right-0 p-2"
              >
                <X color="white" size={20} className="bg-black opacity-50 rounded-full" />
              </button>
            </div>
            <button
              onClick={() => {
                if (imageIdx < images.length - 1) setImageIdx((prev) => prev + 1);
              }}
              className="p-2"
            >
              {<ChevronRight color={imageIdx < images.length - 1 ? 'white' : 'gray'} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewImagesModal;
