'use client';

import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { login } from '@/data/actions/user';
import useUserStore from '@/stores/useUserStore';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

type LoginFormType = {
  email: string;
  password: string;
};

function LoginForm() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: { email: '', password: '' },
  });
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [rememberEmail, setRememberEmail] = useState<boolean>(false);
  const setUser = useUserStore((state) => state.login);

  useEffect(() => {
    const getEmail = localStorage.getItem('email');
    if (getEmail) {
      setValue('email', getEmail);
      setRememberEmail(true);
    }
  }, []);

  const onSubmit = async (loginData: LoginFormType) => {
    const res = await login(loginData);
    if (res?.ok) {
      setUser({
        _id: res.item._id,
        email: res.item.email,
        name: res.item.name,
        phone: res.item.phone,
        type: res.item.type,
        image: res.item.image,
        token: {
          accessToken: res.item.token?.accessToken || '',
          refreshToken: res.item.token?.refreshToken || '',
        },
        loginType: 'email',
      });

      alert('로그인이 완료되었습니다.');

      const redirect = searchParam.get('redirect');
      router.replace(redirect || '/');
    } else {
      if (!res?.ok && res?.message) {
        alert(res.message);
      }
    }

    if (rememberEmail) {
      localStorage.setItem('email', getValues('email'));
    } else {
      localStorage.removeItem('email');
      setValue('email', '');
    }
    setValue('password', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-14 mb-4">
        <fieldset className="contents">
          <legend className="sr-only">로그인</legend>

          <Input
            id="email"
            label="이메일"
            placeholder="E-MAIL"
            hideLabel={true}
            autoComplete="email"
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: emailExp,
                message: '이메일 양식에 맞지 않습니다.',
              },
            })}
          />
          <p className="text-error text-sm mb-1">{errors?.email?.message}</p>

          <div className="relative">
            <Input
              id="password"
              label="비밀번호"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="PASSWORD"
              hideLabel={true}
              autoComplete="current-password"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: passwordExp,
                  message: '영문, 숫자 포함 6자 이상 12자 이하로 입력해주세요.',
                },
              })}
            />
            <button
              type="button"
              onClick={() => {
                setPasswordVisible((prev) => !prev);
              }}
              className="absolute right-2 top-[50%] translate-y-[-50%]"
            >
              {isPasswordVisible ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <p className="text-error text-sm mb-1">{errors?.password?.message}</p>

          <div className="flex justify-between mt-4 mb-11">
            <CheckBox
              id="rememberEmail"
              name="rememberEmail"
              label="이메일 저장"
              fontSize="sm"
              checked={rememberEmail}
              onChange={() => {
                setRememberEmail((prev) => !prev);
              }}
            />
            <Link href="/find-email" className="text-sm">
              이메일 찾기
            </Link>
          </div>
        </fieldset>
        <Button
          type="submit"
          shape="square"
          size="lg"
          bg={`${!isValid ? 'disabled' : 'primary'}`}
          disabled={!isValid ? true : false}
        >
          로그인
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
