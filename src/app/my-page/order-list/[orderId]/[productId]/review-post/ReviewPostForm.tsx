'use client';

import Radio, { RadioItem } from '@/app/my-page/order-list/[orderId]/[productId]/review-post/Radio';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

function ReviewPostForm() {
  const router = useRouter();

  const heightOptions: RadioItem[] = [
    { value: 'under-150', label: '150 이하' },
    { value: '151-160', label: '151~160' },
    { value: '161-170', label: '161~170' },
    { value: '171-180', label: '171~180' },
    { value: 'over-181', label: '181 이상' },
  ];

  const weightOptions: RadioItem[] = [
    { value: 'under-50', label: '50 이하' },
    { value: '51-60', label: '51~60' },
    { value: '61-70', label: '61~70' },
    { value: '71-80', label: '71~80' },
    { value: 'over-81', label: '81 이상' },
  ];

  const sizeOptions: RadioItem[] = [
    { value: 'free', label: 'FREE' },
    { value: '44', label: '44' },
    { value: '55', label: '55' },
    { value: '66', label: '66' },
  ];

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    alert('리뷰 작성이 완료되었습니다.');
    router.replace('/my-page/order-list');
  };

  return (
    <>
      <form className="mb-6" onSubmit={onSubmitHandler}>
        <Radio legend="키" name="height" options={heightOptions} />
        <Radio legend="몸무게" name="weight" options={weightOptions} />
        <Radio legend="사이즈" name="size" options={sizeOptions} />

        <fieldset className="my-6">
          <legend className="mb-1">사진 등록</legend>
          <label
            htmlFor="file-upload"
            className="inline-block px-6 py-2 m-1 rounded-full text-white text-sm cursor-pointer bg-primary"
          >
            사진 선택하기
          </label>
          <input id="file-upload" type="file" name="file-upload" className="inline-block" />
        </fieldset>

        <fieldset className="my-6">
          <legend hidden>상품 후기</legend>
          <label htmlFor="content">상품 후기</label>
          <br />
          <textarea
            name="content"
            id="content"
            className="mt-1 p-2 h-60 w-full resize-none rounded-lg bg-gray-150 focus:outline-none focus:border-[.0625rem] focus:border-primary"
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
