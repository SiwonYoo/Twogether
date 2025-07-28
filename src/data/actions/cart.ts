'use server';

import { ApiRes, ApiResPromise, Cart } from '@/types';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function modifyQuantity(state: ApiRes<Cart> | null, formData: FormData): ApiResPromise<Cart> {
  const cartID = Number(formData.get('cartID'));
  const newQuantity = Number(formData.get('nextQuantity'));
  const accessToken = String(formData.get('accessToken') || '');

  let res: Response;
  let data: ApiRes<Cart>;

  const body = { quantity: newQuantity };
  const url = `${API_URL}/carts/${cartID}`;

  try {
    res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    return { ok: 0, message: '일시적인 네트워크 문제로 수량 변경에 실패했습니다.' };
  }

  if (data.ok) {
    revalidatePath('/cart');
  }

  return data;
}

export async function deleteOneCart(state: ApiRes<Cart> | null, formData: FormData): ApiResPromise<Cart> {
  const cartID = Number(formData.get('cartID'));
  const accessToken = String(formData.get('accessToken') || '');

  let res: Response;
  let data: ApiRes<Cart>;

  const url = `${API_URL}/carts/${cartID}`;

  try {
    res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
  } catch (error) {
    return { ok: 0, message: '일시적인 네트워크 문제로 아이템 삭제에 실패했습니다.' };
  }

  if (data.ok) {
    revalidatePath('/cart');
  }

  return data;
}

export async function deleteCarts(state: ApiRes<Cart> | null, formData: FormData): ApiResPromise<Cart> {
  console.log(formData);
  const rawIDs = formData.get('cartIDs') as string | null;
  const cartIDs = rawIDs ? rawIDs.split(',').map((id) => Number(id)) : [];
  const accessToken = String(formData.get('accessToken') || '');

  let res: Response;
  let data: ApiRes<Cart>;

  const url = `${API_URL}/carts`;
  const body = { carts: cartIDs };

  try {
    res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    return { ok: 0, message: '일시적인 네트워크 문제로 아이템 삭제(복수)에 실패했습니다.' };
  }

  if (data.ok) {
    revalidatePath('/cart');
  }

  return data;
}
