'use client';

import Radio, { RadioItem } from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Radio';
import Rating from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Rating';
import Button from '@/components/common/Button';
import { uploadFiles } from '@/data/actions/file';
import { createReview } from '@/data/actions/review';
import useUserStore from '@/stores/useUserStore';
import Image from 'next/image';
import { useActionState, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ReviewPostForm({ orderId, productId }: { orderId: string; productId: string }) {
  const [state, formAction, isLoading] = useActionState(createReview, null);
  const user = useUserStore((state) => state.user);
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

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

  // 미리보기 이미지
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (!files) return;

  //   setPreviewFiles(Array.from(files).map((item) => URL.createObjectURL(item)));
  // };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const fileRes = await uploadFiles(Array.from(files));
    console.log(fileRes);
    if (fileRes.ok) fileRes.item.map((item) => setSelectedFiles([...selectedFiles, item.path]));
    // setPreviewFiles([...previewFiles, ...Array.from(files).map((item) => URL.createObjectURL(item))]);
  };

  return (
    <>
      <form className="mb-6" action={formAction}>
        <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
        <input type="hidden" name="order_id" value={orderId} />
        <input type="hidden" name="product_id" value={productId} />
        <input type="hidden" name="createdAt" value={'24.11.22'} />
        <input type="hidden" name="images" value={JSON.stringify(selectedFiles)} />

        <Radio legend="키 (선택)" name="height" options={heightOptions} />
        <Radio legend="몸무게 (선택)" name="weight" options={weightOptions} />
        <Radio legend="사이즈" name="size" options={sizeOptions} />

        <Rating>
          <p className="text-error text-sm mb-1">{state?.ok === 0 && state.errors?.rating && '별점을 등록해 주세요'}</p>
        </Rating>

        {/* <fieldset className="my-6">
          <legend className="mb-1">사진 등록 (선택)</legend>
          <label
            htmlFor="attach"
            className="inline-block px-6 py-2 m-1 rounded-full text-white text-sm cursor-pointer bg-primary"
          >
            사진 선택하기
          </label>
          <input
            id="attach"
            type="file"
            name="attach"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="inline-block"
          />
        </fieldset>
        <div className="flex gap-4">
          {previewFiles.map((item, idx) => (
            <Image key={idx} src={item} alt={`미리보기-${idx}`} width={36} height={36} className="object-cover" />
          ))}
        </div> */}

        <fieldset className="my-6">
          <legend className="mb-1">사진 등록 (선택)</legend>
          <div className="flex gap-1">
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
            {selectedFiles.map((item, idx) => (
              <Image
                key={idx}
                src={`${API_URL}/${item}`}
                alt={`미리보기-${idx}`}
                width={60}
                height={60}
                className="object-cover aspect-square"
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="my-6">
          <legend hidden>상품 후기</legend>
          <label htmlFor="content" className="mb-1">
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
    </>
  );
}

export default ReviewPostForm;
