'use server';

import { ApiRes, ApiResPromise, LikeItem } from '@/types';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
export async function ToggleLikeList(id: string, token: string): ApiResPromise<LikeItem[]> {
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
