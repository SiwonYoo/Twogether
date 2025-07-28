'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { signup } from '@/data/actions/user';
import { checkEmail } from '@/data/functions/user';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type SignupForm = {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  phone: string;
  type: 'user';
  loginType: 'email';
};

const nameExp = /^[^\d]*$/;
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordExp = /^[A-Za-z0-9]{6,12}$/;
const phoneExp = /^(01[016789]{1})[0-9]{4}[0-9]{4}$/;

function SignupForm() {
  const router = useRouter();
  const [isEmailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: { name: '', email: '', password: '', phone: '010' },
  });

  useEffect(() => {
    setEmailAvailable(null);
  }, [watch('email')]);

  const handleCheck = async () => {
    const currentEmail = getValues('email');
    if (currentEmail === '') return;
    const res = await checkEmail(currentEmail);
    if (res.ok) setEmailAvailable(true);
    else setEmailAvailable(false);
  };

  const onSubmit = async (user: SignupForm) => {
    if (isEmailAvailable === null) {
      alert('이메일 중복 여부를 확인해주세요.');
      return;
    }
    const { checkPassword, ...data } = user;
    const res = await signup(data);
    if (res.ok) {
      router.replace('/signup/success');
    } else if (!res.ok && res) {
      console.log(res.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-4">
        <fieldset className="contents">
          <legend className="sr-only">회원가입</legend>
          <input type="hidden" value="user" {...register('type')} />
          <input type="hidden" value="email" {...register('loginType')} />
          <div>
            <Input
              id="name"
              label="이름"
              placeholder="실명을 입력해주세요."
              autoComplete="name"
              {...register('name', {
                required: '이름을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해주세요.',
                },
                pattern: {
                  value: nameExp,
                  message: '숫자는 입력할 수 없습니다.',
                },
              })}
            />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Input
              id="email"
              label="이메일"
              placeholder="이메일 양식에 맞게 작성해주세요."
              autoComplete="email"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: emailExp,
                  message: '이메일 양식에 맞지 않습니다.',
                },
              })}
            >
              <Button type="button" bg="white" shape="square" onClick={handleCheck}>
                중복 확인
              </Button>
            </Input>
            {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
            {!errors.email && isEmailAvailable && (
              <p className="text-success text-sm mb-1">사용 가능한 이메일입니다.</p>
            )}
            {!errors.email && isEmailAvailable === false && (
              <p className="text-error text-sm mb-1">이미 등록된 이메일입니다.</p>
            )}
          </div>

          <div>
            <Input
              id="password"
              label="비밀번호"
              type="password"
              placeholder="영문, 숫자 포함 6자 이상 12자 이하"
              autoComplete="new-password"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: passwordExp,
                  message: '영문/숫자 6자 이상 12자 이하로 입력해주세요.',
                },
              })}
            />
            {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <Input
              id="checkPassword"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              autoComplete="off"
              {...register('checkPassword', {
                required: '비밀번호를 확인해주세요.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.checkPassword && <p className="text-error text-sm mt-1">{errors.checkPassword.message}</p>}
          </div>

          <div>
            <Input
              id="phone"
              type="tel"
              label="휴대폰 번호"
              placeholder="'-' 구분없이 입력해주세요."
              autoComplete="tel"
              {...register('phone', {
                required: '휴대폰 번호를 입력해주세요.',
                pattern: {
                  value: phoneExp,
                  message: '숫자로 11자 입력해주세요.',
                },
              })}
            />
            {errors.phone && <p className="text-error text-sm mb-1">{errors.phone.message}</p>}
          </div>
        </fieldset>
        <div className="flex gap-4 mt-11">
          <Button
            onClick={() => {
              router.replace('/signup/terms');
            }}
            shape="square"
            size="lg"
            bg="white"
          >
            이전
          </Button>
          <Button type="submit" shape="square" size="lg">
            회원가입
          </Button>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
