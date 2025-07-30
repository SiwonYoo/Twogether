'use server';

import { ApiRes, ApiResPromise, Order } from '@/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function addOrder(state: ApiRes<Order> | null, formData: FormData): ApiResPromise<Order> {
  // orderItems는 JSON.stringify로 전달된 순수 배열이어야 함
  const orderItemsRaw = formData.get('orderItems') as string;
  const addressName = String(formData.get('addressName') || '');
  const addressValue = String(formData.get('address') || '');
  const shippingMemo = String(formData.get('shippingMemo') || '');
  const paymentMethod = String(formData.get('paymentMethod') || '');
  const accessToken = String(formData.get('accessToken') || '');

  let products: { _id: number; quantity: number }[] = [];
  try {
    products = JSON.parse(orderItemsRaw); // 여긴 배열만 들어있어야 함
  } catch (e) {
    console.error('[addOrder] products JSON 파싱 실패:', e);
  }

  const body = {
    products, // 바로 배열
    address: {
      name: addressName,
      value: addressValue,
    },
    extra: {
      shippingMemo: shippingMemo,
      paymentMethod: paymentMethod,
    },
  };

  console.log('[addOrder] 요청 body:', JSON.stringify(body));

  let res: Response;
  let data: ApiRes<Order>;
  const url = `${API_URL}/orders`;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    console.log('[addOrder] 응답 상태 코드:', res.status);
    data = await res.json();
    console.log('[addOrder] 응답 데이터:', data);
  } catch (error) {
    console.error('[addOrder] 네트워크 오류 발생:', error);
    return { ok: 0, message: '일시적인 네트워크 문제로 주문에 실패했습니다.' };
  }

  if (!data.ok) {
    console.warn('[addOrder] 주문 실패', data);
  }

  return data;
}
