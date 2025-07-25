'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { signup } from '@/data/actions/user';
import { checkEmail } from '@/data/functions/user';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

type SignupForm = { name: string; email: string; password: string; checkPassword: string; phone: string };

const nameExp = /^[^\d]*$/;
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordExp = /^[A-Za-z0-9]{6,12}$/;
const phoneExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

function SignupForm() {
  const router = useRouter();
  const [state, formAction, isLoading] = useActionState(signup, null);
  const [isEmailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: { name: '', email: '', password: '', phone: '010' },
  });

  const onValid = (data: SignupForm) => {
    const formData = new FormData();
    let key: keyof typeof data;
    for (key in data) {
      formData.append(key, data[key]);
    }
    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state?.ok) router.replace('/signup/success');
  }, [state]);

  useEffect(() => {
    setEmailAvailable(null);
  }, [isEmailAvailable]);

  const handleCheck = async () => {
    const res = await checkEmail(watch('email'));
    if (res.ok) setEmailAvailable(true);
    else setEmailAvailable(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4 mb-4">
        <fieldset className="contents">
          <legend className="sr-only">회원가입</legend>
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
          <p className="text-error text-sm mb-1">{errors.name?.message}</p>

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
            <Button bg="white" shape="square" onClick={handleCheck}>
              중복 확인
            </Button>
          </Input>
          <p className="text-error text-sm mb-1">{errors.email?.message}</p>
          <p className="text- text-sm mb-1">{errors.email?.message}</p>
          <p className="text-error text-sm mb-1">{errors.email?.message}</p>

          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="영문, 숫자 포함 6자 이상 12자 이하"
            autoComplete="new-password"
            {...register('checkPassword', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: passwordExp,
                message: '영문/숫자 6자 이상 12자 이하로 입력해주세요.',
              },
            })}
          />
          <p className="text-error text-sm mb-1">{errors.password?.message}</p>

          <Input
            id="checkPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            autoComplete="off"
            {...register('password', {
              required: '비밀번호를 확인해주세요.',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          <p className="text-error text-sm mb-1">{errors.checkPassword?.message}</p>

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
          <p className="text-error text-sm mb-1">{errors.phone?.message}</p>
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
