'use server';

import { ApiResPromise } from '@/types';
import { Review } from '@/types/review';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * user 정보에 맞는 리뷰 목록을 가져옵니다.
 */
export async function getMyReview(accessToken: string): ApiResPromise<Review[]> {
  try {
    const res = await fetch(`${API_URL}/replies`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`, // 인증 토큰
      },
      // cache: 'force-cache',
      next: {
        tags: ['my-review'],
      },
    });

    // 토큰 만료 처리
    // {unauthorized: true} 방법도 고려. ApiResPromise 타입 수정 필요
    if (res.status === 401) {
      return { ok: 0, message: 'unauthorized' };
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 조회에 실패했습니다.' };
  }
}

/**
 * 전체 리뷰 목록을 가져옵니다.
 */
export async function getAllReview(): ApiResPromise<Review[]> {
  try {
    const res = await fetch(`${API_URL}/replies/all`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      // cache: 'force-cache',
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 조회에 실패했습니다.' };
  }
}

/**
 * 리뷰 한 건을 가져옵니다.
 */
export async function getReview(_id: number): ApiResPromise<Review[]> {
  try {
    const res = await fetch(`${API_URL}/replies/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      // cache: 'force-cache',
      next: { tags: [`review/${_id}`] },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 조회에 실패했습니다.' };
  }
}

/**
 * 특정 상품 _id에 맞는 리뷰 목록을 가져옵니다.
 */
export async function getProductReview(_id: number): ApiResPromise<Review[]> {
  try {
    const res = await fetch(`${API_URL}/replies/products/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      // cache: 'force-cache',
      next: { tags: [`review/${_id}`] },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 조회에 실패했습니다.' };
  }
}
