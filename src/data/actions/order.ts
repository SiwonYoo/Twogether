'use server';

import { ApiRes, ApiResPromise, Order } from '@/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function addOrder(state: ApiRes<Order> | null, formData: FormData): ApiResPromise<Order> {
  // orderItems는 JSON.stringify로 전달된 순수 배열이어야 함
  const orderItemsRaw = formData.get('orderItems') as string;
  const addressName = String(formData.get('addressName') || '');
  const addressValue = String(formData.get('address') || '');
  const shippingMemo = String(formData.get('shippingMemo') || '안전하게 배송해주세요!');
  const paymentMethod = String(formData.get('paymentMethod') || '');
  const accessToken = String(formData.get('accessToken') || '');

  let products: { _id: number; quantity: number }[] = [];
  try {
    products = JSON.parse(orderItemsRaw);
  } catch (e) {}

  const body = {
    products,
    address: {
      name: addressName,
      value: addressValue,
    },
    extra: {
      shippingMemo: shippingMemo,
      paymentMethod: paymentMethod,
    },
  };

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

    data = await res.json();
  } catch (error) {
    return { ok: 0, message: '일시적인 네트워크 문제로 주문에 실패했습니다.' };
  }

  if (!data.ok) {
  }

  return data;
}
