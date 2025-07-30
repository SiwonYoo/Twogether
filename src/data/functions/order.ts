import { ApiResPromise, CartResponse, OrderListResponse, SingleOrderResponse, Order } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 주문 목록을 가져옵니다.
 * @param {string} accessToken - 사용자 액세스 토큰
 * @returns {Promise<OrderResponse>} 주문 목록 (Order[] 포함)
 */
export async function getOrders(accessToken: string): Promise<OrderListResponse> {
  try {
    console.log('[getOrders] 호출됨');
    console.log('[getOrders] API URL:', `${API_URL}/orders`);
    console.log('[getOrders] 전달된 accessToken:', accessToken ? '있음' : '없음');

    const res = await fetch(`${API_URL}/orders`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'force-cache',
    });

    console.log('[getOrders] 응답 상태 코드:', res.status);

    const data = (await res.json()) as OrderListResponse;

    console.log('[getOrders] 응답 데이터:', data);

    return data;
  } catch (error) {
    console.error('[getOrders] 오류 발생:', error);
    return {
      ok: 0,
      item: [],
      pagination: {
        page: 1,
        limit: 0,
        total: 0,
        totalPages: 0,
      },
    };
  }
}

/**
 * 주문을 가져옵니다.
 * @param {string} accessToken - 사용자 액세스 토큰
 * @returns {Promise<OrderResponse>} 주문 목록 (Order[] 포함)
 */
export async function getOrder(accessToken: string, orderId: number): Promise<SingleOrderResponse> {
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'force-cache',
    });

    const data = (await res.json()) as SingleOrderResponse;
    return data;
  } catch (error) {
    console.error('[getOrder] 오류 발생:', error);

    const emptyOrder: Order = {
      _id: 0,
      products: [],
      address: { name: '', value: '' },
      extra: { shippingMemo: '', paymentMethod: '' },
      state: '',
      user_id: 0,
      createdAt: '',
      updatedAt: '',
      cost: {
        products: 0,
        shippingFees: 0,
        discount: { products: 0, shippingFees: 0 },
        total: 0,
      },
    };

    return {
      ok: 0,
      item: emptyOrder,
    };
  }
}
