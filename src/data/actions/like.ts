'use server';

import { ApiRes, ApiResPromise, LikeItem } from '@/types';
import { revalidatePath } from 'next/cache';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 상품을 찜 목록에 추가하는 API 요청 함수입니다.
 *
 * - 요청 본문에는 `target_id`로 상품 ID를 포함하여 전송합니다.
 * - 요청 헤더에는 인증 토큰(`Bearer`)과 클라이언트 ID가 포함됩니다.
 * - 성공 시 API 응답(JSON)을 반환하고, 실패 시 에러 메시지를 포함한 기본 응답을 반환합니다.
 *
 * @param {number} id - 찜 추가할 상품의 ID
 * @param {string} token - 사용자 인증에 사용되는 액세스 토큰 (Bearer 형식)
 *
 * @returns {Promise<ApiRes<LikeItem[]>>} 서버 응답 객체를 포함한 Promise
 */

export async function PostLikeList(id: number, token: string): ApiResPromise<LikeItem[]> {
  let res: Response;
  let data: ApiRes<{ ok: 0 | 1 }>;
  const body = {
    target_id: id,
  };

  try {
    res = await fetch(`${API_URL}/bookmarks/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return (data = await res.json());
  } catch (error) {
    console.log('error', error);
    return { ok: 0, message: '북마크 목록을 불러오지 못했습니다' };
  }
}
/**
 * 특정 상품을 찜 목록에서 삭제하는 API 요청 함수입니다.
 *
 * - 서버에 DELETE 요청을 보내 찜 항목을 제거합니다.
 * - 요청 헤더에 인증 토큰(`Bearer`)과 클라이언트 ID가 포함됩니다.
 * - 성공 시 응답 데이터를 반환하고, 실패 시 에러 메시지를 포함한 응답을 반환합니다.
 *
 * @param {number} id - 삭제할 찜 항목의 ID
 * @param {string} token - 사용자 인증에 사용되는 액세스 토큰 (Bearer 형식)
 *
 * @returns {Promise<ApiRes<LikeItem[]>>} 서버 응답 객체를 포함한 Promise
 */

export async function DeleteLikeList(id: number, token: string): ApiResPromise<LikeItem[]> {
  let res: Response;
  let data: ApiRes<{ ok: 0 | 1 }>;

  try {
    res = await fetch(`${API_URL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });

    return (data = await res.json());
  } catch (error) {
    console.log('error', error);
    return { ok: 0, message: '북마크 목록을 불러오지 못했습니다' };
  }
}

/**
 * 찜 페이지(`/like`)의 데이터를 다시 가져오도록 강제로 캐시를 무효화합니다.
 *
 * - Next.js의 `revalidatePath()`를 사용하여 클라이언트/서버 캐시를 무효화합니다.
 * - 일반적으로 데이터 변경 후 최신 데이터를 반영하기 위해 호출합니다.
 *
 * @returns {void}
 */

export async function revalidateAndRedirectLike() {
  revalidatePath('/like');
}
