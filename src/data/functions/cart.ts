import { ApiResPromise, CartResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 장바구니 목록(로그인)을 가져옵니다.
 * @param {string} accessToken - 사용자 액세스 토큰
 * @returns {Promise<ApiResPromise<Cart[]>>} 장바구니 목록
 */
export async function getCarts(accessToken: string): Promise<CartResponse> {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });
    return res.json() as Promise<CartResponse>;
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      item: [],
      cost: { products: 0, shippingFees: 0, discount: { products: 0, shippingFees: 0 }, total: 0 },
    };
  }
}
