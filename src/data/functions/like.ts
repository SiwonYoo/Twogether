import { ApiRes, ApiResPromise, LikeItem } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 현재 로그인한 사용자의 찜 목록을 조회하는 API 요청 함수입니다.
 *
 * - 요청 헤더에 액세스 토큰(Bearer)과 클라이언트 ID가 포함됩니다.
 * - `/bookmarks/product` 엔드포인트에서 찜한 상품 목록 데이터를 불러옵니다.
 * - 성공 시 찜 항목 리스트를 포함한 응답 객체를 반환합니다.
 * - 실패 시 오류 메시지를 포함한 기본 실패 응답을 반환합니다.
 *
 * @param {string} accessToken - 사용자 인증에 사용되는 Bearer 액세스 토큰
 *
 * @returns {Promise<ApiRes<LikeItem[]>>} 서버 응답 객체를 포함한 Promise
 */

export async function GetLikeList(accessToken: string): ApiResPromise<LikeItem[]> {
  let res: Response;
  let data: ApiRes<{ ok: 0 | 1 }>;
  try {
    res = await fetch(`${API_URL}/bookmarks/product`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      cache: 'no-store',
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('9. GetLikeList 에러:', error);
    return { ok: 0, message: '북마크 목록을 불러오지 못했습니다' };
  }
}
