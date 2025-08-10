'use client';

import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { signup, verifySignUpEmail } from '@/data/actions/user';
import { checkEmail, getAllUsers } from '@/data/functions/user';
import { GetAllUsersType } from '@/types';
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
const passwordExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
const phoneExp = /^(01[016789]{1})[0-9]{4}[0-9]{4}$/;

function SignupForm() {
  const router = useRouter();
  const [isEmailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [isPhoneAvailable, setPhoneAvailable] = useState<boolean | null>(null);
  const [userList, setUserList] = useState<GetAllUsersType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignupForm>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: { name: '', email: '', password: '', phone: '010' },
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // 첫 렌더링 시 유저 정보 GET
  useEffect(() => {
    async function getUserList() {
      const data = await getAllUsers();
      if (data.ok) setUserList(data.item);
    }
    getUserList();
  }, []);

  // 이메일 변경 시 사용 가능 상태 초기화
  useEffect(() => {
    setEmailAvailable(null);
  }, [watch('email')]);

  // 이메일 중복 확인 (이메일 '중복 확인' 버튼 클릭 시)
  const handleCheckEmail = async () => {
    const currentEmail = getValues('email');
    if (!emailExp.test(currentEmail)) return;
    const res = await checkEmail(currentEmail);
    if (res.ok) setEmailAvailable(true);
    else setEmailAvailable(false);
  };

  // 휴대폰 번호 변경 시 사용 가능 상태 초기화
  useEffect(() => {
    setPhoneAvailable(null);
  }, [watch('phone')]);

  // 휴대폰 번호 중복 확인 (휴대폰 번호 '중복 확인' 버튼 클릭 시)
  const handleCheckPhone = async () => {
    const currentPhone = getValues('phone');
    if (!phoneExp.test(currentPhone)) return;

    let isPhoneDuplicated = false;

    userList.map((item) => {
      if (item.phone === getValues('phone')) {
        setPhoneAvailable(false);
        isPhoneDuplicated = true;
      }
    });

    if (!isPhoneDuplicated) setPhoneAvailable(true);
  };

  // 폼 제출 이벤트 ('회원가입' 버튼 클릭 시)
  const onSubmit = async (user: SignupForm) => {
    if (isEmailAvailable === null) {
      setAlertMessage('이메일 중복 여부를 확인해주세요.');
      setIsAlertOpen(true);
      return;
    }

    if (isPhoneAvailable === null) {
      setAlertMessage('휴대폰 번호 중복 여부를 확인해주세요.');
      setIsAlertOpen(true);
      return;
    }

    setIsLoading(true);

    const { checkPassword, ...data } = user;
    const res = await signup(data);

    if (res.ok) {
      const verifyEmailRes = await verifySignUpEmail(getValues('email'));

      if (verifyEmailRes.ok) router.replace('/signup/success');
    }

    setIsLoading(false);
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
              <Button type="button" bg="white" shape="square" onClick={handleCheckEmail}>
                중복 확인
              </Button>
            </Input>
            {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
            {!errors.email && isEmailAvailable && (
              <p className="text-success text-sm mt-1">사용 가능한 이메일입니다.</p>
            )}
            {!errors.email && isEmailAvailable === false && (
              <p className="text-error text-sm mt-1">이미 등록된 이메일입니다.</p>
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
                  message: '영문, 숫자 포함 6자 이상 12자 이하로 입력해주세요.',
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
                  message: '휴대폰 번호 양식에 맞지 않습니다.',
                },
              })}
            >
              <Button type="button" bg="white" shape="square" onClick={handleCheckPhone}>
                중복 확인
              </Button>
            </Input>
            {errors.phone && <p className="text-error text-sm mt-1">{errors.phone.message}</p>}
            {!errors.phone && isPhoneAvailable && <p className="text-success text-sm mt-1">사용 가능한 번호입니다.</p>}
            {!errors.phone && isPhoneAvailable === false && (
              <p className="text-error text-sm mt-1">이미 등록된 번호입니다.</p>
            )}
          </div>
        </fieldset>
        <div className="flex gap-4 mt-11">
          <Button
            type="button"
            onClick={() => {
              router.replace('/signup/terms');
            }}
            shape="square"
            size="lg"
            bg="white"
          >
            이전
          </Button>
          <Button
            type="submit"
            shape="square"
            size="lg"
            bg={`${!isValid ? 'disabled' : 'primary'}`}
            disabled={!isValid ? true : false}
          >
            회원가입
          </Button>
        </div>
      </form>

      {isLoading && (
        <div className="fixed flex h-dvh min-w-[400px] max-w-[768px] mx-auto inset-0 justify-center items-center bg-black/50 z-10">
          <div className="w-full mb-5 text-center text-white">
            <p className="text-xl font-bold">회원가입 진행 중입니다.</p>
            <p>잠시만 기다려주세요.</p>
          </div>
        </div>
      )}

      <Alert isOpen={isAlertOpen} setOpen={setIsAlertOpen}>
        <p className="break-keep text-center">{alertMessage}</p>
      </Alert>
    </>
  );
}

export default SignupForm;
