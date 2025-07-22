import { ApiRes, ApiResPromise, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function login(state: ApiRes<User> | null, formData: FormData): ApiResPromise<User> {
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: ApiRes<User>;

  try {
    res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });
    data = await res.json();
    console.log('로그인 성공', data);
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
  return data;
}
