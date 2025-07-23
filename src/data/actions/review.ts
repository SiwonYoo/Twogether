'use server';

import { uploadFile } from '@/data/actions/file';
import { ApiRes, ApiResPromise } from '@/types';
import { Review } from '@/types/review';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 리뷰 작성 함수
 */
export async function createReview(state: ApiRes<Review> | null, formData: FormData): ApiResPromise<Review> {
  let res: Response;
  let data: ApiRes<Review>;

  try {
    const attach = formData.get('attach') as File;
    let image;
    if (attach.size > 0) {
      const fileRes = await uploadFile(formData);

      if (fileRes.ok) {
        image = fileRes.item[0].path;
      } else {
        return fileRes;
      }
    }

    const raw = Object.fromEntries(formData.entries());
    const body = {
      accessToken: raw['accessToken'],
      order_id: Number(raw['order_id']),
      product_id: Number(raw['product_id']),
      rating: Number(raw['rating']),
      content: raw['content'],
      extra: { height: raw['height'], weight: raw['weight'], size: raw['size'], image: image },
    };

    res = await fetch(`${API_URL}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${body.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }

  if (data.ok) {
    // revalidatePath(`/my-page/review`);
    revalidateTag('my-review');
    redirect(`/my-page/review`);
  } else {
    return data;
  }
}

/**
 * 리뷰 삭제 함수
 */
export async function deleteReview(
  state: ApiRes<Review> | null,
  { _id, accessToken }: { _id: number; accessToken: string }
): ApiResPromise<Pick<Review, '_id'>> {
  let res: Response;
  let data: ApiRes<{ ok: 0 | 1 }>;

  try {
    res = await fetch(`${API_URL}/replies/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    // revalidateTag('my-review');
    // redirect(`/my-page/review`);
    return { ok: 1, item: { _id } };
  } else {
    return data;
  }
}
