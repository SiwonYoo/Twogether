'use server';

import { uploadFiles } from '@/data/actions/file';
import { ApiRes, ApiResPromise } from '@/types';
import { Review, ReviewExtra } from '@/types/review';
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
    const attaches = formData.getAll('attach') as File[];
    let images;
    if (attaches.length > 0) {
      const fileRes = await uploadFiles(attaches);

      if (fileRes.ok) {
        images = fileRes.item.map((item) => item.path);
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
      extra: { height: raw['height'], weight: raw['weight'], size: raw['size'], images: images },
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
    revalidateTag('my-review');
    redirect(`/my-page/review`);
  } else {
    return data;
  }
}

/**
 * 리뷰 수정 함수
 */
export async function editReview(state: ApiRes<Review> | null, formData: FormData): ApiResPromise<Review> {
  let res: Response;
  let data: ApiRes<Review>;

  const initialFiles = formData.get('initialFiles') as string;
  let images: string[] = [];
  if (initialFiles) images = JSON.parse(initialFiles);
  const attaches = formData.getAll('attach') as File[];

  if (attaches.length > 0) {
    const fileRes = await uploadFiles(attaches);

    if (fileRes.ok) {
      fileRes.item.forEach((item) => images?.push(item.path));
    } else {
      return fileRes;
    }
  }

  const raw = Object.fromEntries(formData.entries());

  const _id = raw['_id'];
  const accessToken = raw['accessToken'];
  const redirectPath = String(raw['redirect']);
  const prevExtra = { ...JSON.parse(String(raw['extra'])) };
  const newExtra = { ...prevExtra, height: raw['height'], weight: raw['weight'], size: raw['size'], images: images };
  console.log(prevExtra);
  console.log(newExtra);

  try {
    const body = {
      rating: Number(raw['rating']),
      content: raw['content'],
      extra: newExtra,
    };

    res = await fetch(`${API_URL}/replies/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 에러가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`review/${_id}`);
    revalidateTag('my-review');
    redirect(redirectPath !== '' ? redirectPath : '/my-page/review');
  }
  return data;
}

/**
 * 리뷰 삭제 함수
 */
export async function deleteReview(state: ApiRes<Review> | null, formData: FormData): ApiResPromise<Review> {
  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<Review>;

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
    revalidateTag('my-review');
  }
  return data;
}

/**
 * 리뷰 댓글 함수
 */
export async function postReviewComment(state: ApiRes<Review> | null, formData: FormData): ApiResPromise<Review> {
  let res: Response;
  let data: ApiRes<Review>;

  const raw = Object.fromEntries(formData.entries());

  const _id = raw['_id'];
  const accessToken = raw['accessToken'];
  const newComment = String(raw['comment']);
  const userId = Number(raw['userId']);
  const userName = String(raw['userName']);
  const prevExtra = { ...JSON.parse(String(raw['extra'])) };
  const { comment, ...extra }: { comment: ReviewExtra['comment']; extra: ReviewExtra } = prevExtra;

  const newData = { content: newComment, user: { _id: userId, name: userName } };
  if (comment) comment.push(newData);

  try {
    const body = { content: raw['content'], extra: { ...extra, comment: comment || [newData] } };

    res = await fetch(`${API_URL}/replies/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 에러가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag('my-review');
    revalidateTag(`review/${_id}`);
  }
  return data;
}
