'use client';

import Radio, { RadioItem } from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Radio';
import Rating from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Rating';
import Button from '@/components/common/Button';
import { editReview } from '@/data/actions/review';
import useUserStore from '@/stores/useUserStore';
import { ApiRes } from '@/types';
import { Review } from '@/types/review';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useActionState, useState } from 'react';

type formValueType = {
  height: string | null;
  weight: string | null;
  size: string | null;
  rating: number | null;
  content: string | null;
};

function EditReviewForm({ review }: { review: Review }) {
  const [state, formAction, isLoading] = useActionState(uploadAction, null);
  const [initialFiles, setInitialFiles] = useState<string[]>(review.extra.images || []);
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const user = useUserStore((state) => state.user);
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');

  const [formValues, setFormValues] = useState<formValueType>({
    height: review.extra.height ?? null,
    weight: review.extra.weight ?? null,
    size: review.extra.size ?? null,
    rating: review.rating,
    content: review.content,
  });

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
    { value: 'FREE', label: 'FREE' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
  ];

  async function uploadAction(prevState: ApiRes<Review> | null, formData: FormData) {
    formData.delete('attach');
    selectedFiles.forEach((file: File) => formData.append('attach', file));
    return await editReview(prevState, formData);
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    // 최대 용량 설정
    const maxSizeMB = 1;
    const maxSizsBytes = maxSizeMB * 1024 * 1024;

    Array.from(files).map((item) => {
      if (item.size > maxSizsBytes) {
        alert(`파일 크기는 ${maxSizeMB}MB 이하만 업로드 가능합니다.`);
        event.target.value = '';
        return;
      }
    });

    if (files.length < 6 - (initialFiles.length + previewFiles.length)) {
      setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
      setPreviewFiles((prev) => [...prev, ...Array.from(files).map((item) => URL.createObjectURL(item))]);
    } else {
      alert('사진은 최대 5장까지 첨부할 수 있습니다.');
    }
  };

  const handleImageDelete = (idx: number) => {
    if (idx < initialFiles.length) {
      setInitialFiles((prev) => prev.filter((value, prevIdx) => prevIdx !== idx));
    } else {
      setPreviewFiles((prev) => prev.filter((value, prevIdx) => prevIdx !== idx - initialFiles.length));
      setSelectedFiles((prev) => prev.filter((value, prevIdx) => prevIdx !== idx));
    }
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form className="mb-6" action={formAction}>
        <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
        <input type="hidden" name="_id" value={review._id} />
        <input type="hidden" name="redirect" value={redirect || ''} />
        <input type="hidden" name="initialFiles" value={JSON.stringify(initialFiles) || []} />
        <input type="hidden" name="productPrice" value={review.extra.productPrice} />

        <Radio
          legend="키 (선택)"
          name="height"
          options={heightOptions}
          selected={formValues.height}
          inputChange={inputChange}
        />
        <Radio
          legend="몸무게 (선택)"
          name="weight"
          options={weightOptions}
          selected={formValues.weight}
          inputChange={inputChange}
        />
        <Radio
          legend="사이즈 (선택)"
          name="size"
          options={sizeOptions}
          selected={formValues.size}
          inputChange={inputChange}
        />

        <Rating selected={Number(formValues.rating)} inputChange={inputChange}>
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
            {[...initialFiles, ...previewFiles].map((item, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={idx < initialFiles.length ? `${item}` : item}
                  alt={`미리보기-${idx}`}
                  width={60}
                  height={60}
                  className="object-cover aspect-square"
                />
                <button
                  type="button"
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
          <legend hidden>상품 후기</legend>
          <label htmlFor="content" className="mb-1">
            상품 후기
          </label>
          <p className="text-error text-sm mb-1">{state?.ok === 0 && state?.errors?.content?.msg}</p>
          <textarea
            name="content"
            id="content"
            className="p-2 h-60 w-full resize-none rounded-lg bg-gray-150 focus:outline-none focus:border-[1px] focus:border-primary"
            value={formValues.content || ''}
            onChange={inputChange}
            placeholder="200자 이하로 작성해 주세요."
            maxLength={200}
          />
        </fieldset>
        <Button type="submit" size="lg">
          수정
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

export default EditReviewForm;
