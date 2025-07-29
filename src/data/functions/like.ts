import { ApiRes, ApiResPromise, LikeItem } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

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
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('9. GetLikeList 에러:', error);
    return { ok: 0, message: '북마크 목록을 불러오지 못했습니다' };
  }
}


