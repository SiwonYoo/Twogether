import { ApiResPromise, Product } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * Product 정보에 맞는 리뷰 목록을 가져옵니다.
 */
export async function getProducts(): ApiResPromise<Product[]> {
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

/**
 * 특정 게시글의 상세 정보를 가져옵니다.
 * @param {number} _id - 게시글의 고유 ID
 * @returns {Promise<ApiRes<Post>>} - 게시글 상세 정보 응답 객체
 */
interface getProductProps {
  productType: string;
  id: number;
}

export async function getProduct(data: getProductProps): ApiResPromise<Product[]> {
  const { productType, id } = data;
  try {
    const res = await fetch(`${API_URL}/products/?extra.category=${productType}&_id=${id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
    });

    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}
