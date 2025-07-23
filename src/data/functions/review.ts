'use server';

import { ApiResPromise } from '@/types';
import { Review } from '@/types/review';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * user 정보에 맞는 리뷰 목록을 가져옵니다.
 */
export async function getReview(accessToken: string): ApiResPromise<Review[]> {
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
