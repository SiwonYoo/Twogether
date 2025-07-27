'use client';

import Radio, { RadioItem } from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Radio';
import Rating from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Rating';
import Button from '@/components/common/Button';
import { createReview } from '@/data/actions/review';
import useUserStore from '@/stores/useUserStore';
import { ApiRes } from '@/types';
import { Review } from '@/types/review';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useActionState, useState } from 'react';

function ReviewPostForm({ orderId, productId }: { orderId: string; productId: string }) {
  const [state, formAction, isLoading] = useActionState(uploadAction, null);
  const user = useUserStore((state) => state.user);
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [selectedfiles, setSelectedFiles] = useState<File[]>([]);

  const heightOptions: RadioItem[] = [
    { value: '150 이하', label: '150 이하' },
    { value: '151-160', label: '151~160' },
    { value: '161-170', label: '161~170' },
    { value: '171-180', label: '171~180' },
    { value: '181 이상', label: '181 이상' },
  ];

  const weightOptions: RadioItem[] = [
    { value: '50 이하', label: '50 이하' },
    { value: '51-60', label: '51~60' },
    { value: '61-70', label: '61~70' },
    { value: '71-80', label: '71~80' },
    { value: '81 이상', label: '81 이상' },
  ];

  const sizeOptions: RadioItem[] = [
    { value: 'free', label: 'FREE' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
  ];

  async function uploadAction(prevState: ApiRes<Review> | null, formData: FormData) {
    formData.delete('attach');
    selectedfiles.forEach((file: File) => formData.append('attach', file));
    return await createReview(prevState, formData);
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
      setPreviewFiles((prev) => [...prev, ...Array.from(files).map((item) => URL.createObjectURL(item))]);
    }
  };

  const handleImageDelete = (idx: number) => {
    setPreviewFiles((prev) => prev.filter((value, prevIdx) => prevIdx !== idx));
    setSelectedFiles((prev) => prev.filter((value, prevIdx) => prevIdx !== idx));
  };

  return (
    <>
      <form className="mb-6" action={formAction}>
        <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
        <input type="hidden" name="order_id" value={orderId} />
        <input type="hidden" name="product_id" value={productId} />
        <input type="hidden" name="createdAt" value={'24.11.22'} />

        <Radio legend="키 (선택)" name="height" options={heightOptions} />
        <Radio legend="몸무게 (선택)" name="weight" options={weightOptions} />
        <Radio legend="사이즈" name="size" options={sizeOptions} />

        <Rating>
          <p className="text-error text-sm mb-1">{state?.ok === 0 && state.errors?.rating && '별점을 등록해 주세요'}</p>
        </Rating>

        <fieldset className="my-6">
          <legend className="mb-1">사진 등록 (선택)</legend>
          <div className="flex gap-1 mt-1">
            <label
              htmlFor="attach"
              className="inline-block w-15 h-15 content-center text-center text-3xl text-white  cursor-pointer bg-primary"
            >
              +
            </label>
            <input
              id="attach"
              type="file"
              name="attach"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {previewFiles.map((item, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={item}
                  alt={`미리보기-${idx}`}
                  width={60}
                  height={60}
                  className="object-cover aspect-square"
                />
                <button
                  onClick={() => {
                    handleImageDelete(idx);
                  }}
                  className="absolute top-1 right-1 rounded-full bg-black opacity-50"
                >
                  <X color="white" size={16} />
                </button>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="my-6">
          <legend className="mb-1">상품 후기</legend>
          <label htmlFor="content" className="sr-only">
            상품 후기
          </label>
          <p className="text-error text-sm mb-1">{state?.ok === 0 && state?.errors?.content?.msg}</p>
          <textarea
            name="content"
            id="content"
            className="p-2 h-60 w-full resize-none rounded-lg bg-gray-150 focus:outline-none focus:border-[.0625rem] focus:border-primary"
            defaultValue={''}
            placeholder="200자 이하로 작성해 주세요."
          />
        </fieldset>
        <Button type="submit" size="lg">
          등록
        </Button>
      </form>

      {isLoading && (
        <div className="fixed flex h-dvh min-w-[400px] max-w-[768px] mx-auto inset-0 justify-center items-center bg-black/50 z-10">
          <div className="w-full mb-5 text-center text-white">
            <p className="text-xl font-bold">등록중입니다.</p>
            <p>잠시만 기다려주세요.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewPostForm;
