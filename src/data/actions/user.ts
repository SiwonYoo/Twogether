'use server';

import { uploadFile } from '@/data/actions/file';
import { ApiRes, ApiResPromise, EditProfileImageType, EditProfileType, LoginDataType, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 회원가입 함수
 */
export async function signup(user: User): ApiResPromise<User> {
  let res: Response;
  let data: ApiRes<User>;

  try {
    res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(user),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  return data;
}

/**
 * 로그인 함수
 */
export async function login(loginData: LoginDataType): ApiResPromise<User> {
  let res: Response;
  let data: ApiRes<User>;

  try {
    res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(loginData),
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
  return data;
}

/**
 * 회원 정보 수정 함수
 */
export async function editProfile(editData: EditProfileType): ApiResPromise<EditProfileType> {
  let res: Response;
  let data: ApiRes<EditProfileType>;

  const { accessToken, _id, ...body } = editData;

  try {
    res = await fetch(`${API_URL}/users/${_id}`, {
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
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
  return data;
}

export async function editProfileImage({
  _id,
  imageFile,
  accessToken,
}: EditProfileImageType): ApiResPromise<{ image: string | null }> {
  let res: Response;
  let data: ApiRes<{ image: string | null }>;

  try {
    let body: { image: string | null };

    if (!imageFile) {
      body = { image: null };
    } else {
      const formData = new FormData();
      formData.append('attach', imageFile);

      let imagePath: string;
      const fileRes = await uploadFile(formData);
      if (fileRes.ok) {
        imagePath = fileRes.item[0].path;
      } else {
        return fileRes;
      }

      body = { image: imagePath };
    }

    res = await fetch(`${API_URL}/users/${_id}`, {
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
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  return data;
}
