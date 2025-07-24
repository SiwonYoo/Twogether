'use client';

import Radio, { RadioItem } from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Radio';
import Rating from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Rating';
import Button from '@/components/common/Button';
import { editReview } from '@/data/actions/review';
import useUserStore from '@/stores/useUserStore';
import { Review } from '@/types/review';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

function EditReviewForm({ review }: { review: Review }) {
  const [state, formAction, isLoading] = useActionState(editReview, null);
  const user = useUserStore((state) => state.user);
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');

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

  return (
    <>
      <form className="mb-6" action={formAction}>
        <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
        <input type="hidden" name="_id" value={review._id} />
        <input type="hidden" name="updatedAt" value={'24.11.22'} />
        <input type="hidden" name="redirect" value={redirect || ''} />

        <Radio legend="키 (선택)" name="height" options={heightOptions} selected={review?.extra?.height} />
        <Radio legend="몸무게 (선택)" name="weight" options={weightOptions} selected={review?.extra?.weight} />
        <Radio legend="사이즈" name="size" options={sizeOptions} selected={review?.extra?.size} />

        <Rating selected={review?.rating}>
          <p className="text-error text-sm mb-1">{state?.ok === 0 && state.errors?.rating && '별점을 등록해 주세요'}</p>
        </Rating>

        <fieldset className="my-6">
          <legend className="mb-1">사진 등록 (선택)</legend>
          <label
            htmlFor="attach"
            className="inline-block px-6 py-2 m-1 rounded-full text-white text-sm cursor-pointer bg-primary"
          >
            사진 선택하기
          </label>
          <input id="attach" type="file" name="attach" className="inline-block" />
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
            defaultValue={review?.content}
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

export default EditReviewForm;
