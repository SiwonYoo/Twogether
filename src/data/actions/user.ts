'use server';

import { uploadFile } from '@/data/actions/file';
import {
  ApiRes,
  ApiResPromise,
  EditProfileImageType,
  EditProfileType,
  LoginDataType,
  User,
  VerifyEmailType,
} from '@/types';

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

/**
 * 프로필 사진 수정 함수
 */
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

/**
 * 이메일 인증 함수
 */
export async function verifyEmail(emailAddr: string, verificationCode: string): Promise<ApiRes<VerifyEmailType>> {
  let res: Response;
  let data: ApiRes<VerifyEmailType>;
  const body = {
    to: emailAddr,
    serviceName: 'Twogether',
    subject: '[Twogether] 이메일 인증 번호입니다.',
    content: `<div style="margin: 0 auto; max-width: 600px; text-align: center;"><h1>Twogether</h1><h2>개인 정보 수정<br/>인증번호를 알려드립니다.</h2><p>인증번호를 확인하신 후 Twogether에서 이메일 인증을 완료해 주세요.</p><p>개인정보보호를 위해 인증번호는 10분 동안만 유효합니다.</p><p>${verificationCode}</p></div>`,
  };

  try {
    res = await fetch(`${API_URL}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
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
