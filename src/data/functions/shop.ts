import { ApiResPromise, Product, ProductList } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * Product 정보에 맞는 리뷰 목록을 가져옵니다.
 */
export async function getProduct(): ApiResPromise<ProductList[]> {
  try {
    const res = await fetch(`${API_URL}/products/`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 조회에 실패했습니다.' };
  }
}
