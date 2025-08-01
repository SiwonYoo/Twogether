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
    content: `<div style="margin: 0 auto; padding: 20px; max-width: 600px;">
              <h1 style="color: #2e1f42;"><b>Twogether</b></h1>
              <hr/>
              <h2 style="font-size: 20px">인증번호 발송 안내</h2>
              <p style="margin: 4px 0;">안녕하세요, <b style="color: #2e1f42;">Twogether</b> 입니다.</p>
              <p style="margin: 4px 0;">아래와 같이 인증번호를 발급해드립니다.</p>
              <p style="margin: 4px 0;">개인정보보호를 위해 인증번호는 5분 동안만 유효합니다.</p>
              <div style="padding: 10px; margin-block: 30px; border: 1px #000000 solid; border-radius: 10px; text-align: center;"><b style="font-size: 20px; letter-spacing: 10px;">${verificationCode}</b></div>
              <div style="padding: 20px; background-color: #ebebeb;">
              <p style="margin: 4px 0; font-size: 14px;"><b style="color: #2e1f42;">Twogether</b>를 이용해주셔서 감사합니다.</p>
              <small style="margin: 0; font-size: 12px;">* 고객님 본인이 요청하신 것이 아닌 경우, 고객센터로 문의 바랍니다.</small><br/>
              <small style="margin: 0; font-size: 12px;">* 본 메일은 발신 전용 메일입니다. 문의사항은 1:1 문의를 이용해 주시기 바랍니다.</small>
              </div>
              </div>`,
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
