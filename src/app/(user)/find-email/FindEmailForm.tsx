'use client';

import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import LinkButton from '@/components/common/LinkButton';
import { getAllUsers } from '@/data/functions/user';
import { GetAllUsersType } from '@/types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type FindEmailFormType = {
  name: string;
  phone: string;
};

const nameExp = /^[^\d]*$/;
const phoneExp = /^(01[016789]{1})[0-9]{4}[0-9]{4}$/;

function FindEmailForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<FindEmailFormType>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: { name: '', phone: '' },
  });
  const [userList, setUserList] = useState<GetAllUsersType[]>([]);
  const [foundEmail, setFoundEmail] = useState('');
  const [isFound, setIsFound] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    async function getUserList() {
      const data = await getAllUsers();
      if (data.ok) setUserList(data.item);
    }
    getUserList();
  }, []);

  const onSubmit = () => {
    let flag = false;

    for (const item of userList) {
      if (item.name === getValues('name') && item.phone === getValues('phone')) {
        const fullEmail = item.email.split('@');
        const maskedEmail = fullEmail[0].slice(0, 2) + '*'.repeat(fullEmail[0].length - 2);
        setFoundEmail(maskedEmail + '@' + fullEmail[1]);
        setIsFound(true);
        flag = true;
        break;
      }
    }
    if (!flag) {
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-5">
          <div>
            <Input
              id="name"
              label="이름"
              placeholder="실명을 입력해주세요."
              autoComplete="name"
              disabled={isFound}
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
              id="phone"
              type="tel"
              label="휴대폰 번호"
              placeholder="'-' 구분없이 입력해주세요."
              autoComplete="tel"
              disabled={isFound}
              {...register('phone', {
                required: '휴대폰 번호를 입력해주세요.',
                pattern: {
                  value: phoneExp,
                  message: '휴대폰 번호 양식에 맞지 않습니다.',
                },
              })}
            />
            {errors.phone && <p className="text-error text-sm mb-1">{errors.phone.message}</p>}
          </div>
          <Button
            disabled={isFound || !isValid}
            type="submit"
            shape="square"
            size="lg"
            bg={isFound || !isValid ? 'disabled' : 'white'}
          >
            확인
          </Button>
        </form>

        {isFound && (
          <div className="flex flex-col gap-5">
            <div className="p-5 rounded-lg border-1 border-gray-250 text-center">
              <p className="mb-4">고객님의 이메일 정보입니다.</p>
              <p className="text-primary font-bold">{foundEmail}</p>
            </div>
            {redirect ? (
              <LinkButton href={redirect} shape="square" size="lg" bg="white">
                이메일 인증 문제 해결하기
              </LinkButton>
            ) : (
              <LinkButton href={'/login'} shape="square" size="lg" lang="eng">
                LOGIN
              </LinkButton>
            )}
          </div>
        )}
      </div>

      <Alert isOpen={isAlertOpen} setOpen={setIsAlertOpen}>
        <p className="break-keep text-center">입력하신 정보와 일치하는 회원이 없습니다.</p>
      </Alert>
    </>
  );
}

export default FindEmailForm;
