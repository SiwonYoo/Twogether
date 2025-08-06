'use client';

import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { editProfile } from '@/data/actions/user';
import useUserStore from '@/stores/useUserStore';
import { ApiRes, EditProfileType } from '@/types';
import { RotateCcwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const nameExp = /^[^\d]*$/;
const phoneExp = /^(01[016789]{1})[0-9]{4}[0-9]{4}$/;
const passwordExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

function EditProfileForm() {
  const router = useRouter();
  const [isPasswordEditable, setIsPasswordEditable] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.login);
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<EditProfileType>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
  });

  const onSubmit = async (editData: EditProfileType) => {
    if (!user) return;

    let res: ApiRes<EditProfileType>;
    if (isPasswordEditable) {
      const { checkPassword, ...data } = editData;
      res = await editProfile(data);
    } else {
      const { password, checkPassword, ...data } = editData;
      res = await editProfile(data);
    }

    if (res.ok) {
      setUser({ ...user, name: editData.name, phone: editData.phone });
      router.replace('/my-page/edit-profile/success');
    } else console.error('등록에 실패했습니다.');
  };

  useEffect(() => {
    if (user) {
      reset({ accessToken: user.token?.accessToken, _id: user._id, name: user.name, phone: user.phone });
    }
  }, [user]);

  useEffect(() => {
    // isPasswordEditable 변화 시 유효성 재검사를 위해 항상 valid한 _id 필드를 트리거한다.
    trigger('_id');
  }, [isPasswordEditable]);

  const handleReset = (field: 'name' | 'phone') => {
    if (!user) return;
    resetField(field);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <fieldset className="contents">
          <legend className="sr-only">개인 정보 수정</legend>
          <input type="hidden" {...register('accessToken')} />
          <input type="hidden" {...register('_id')} />
          <div>
            <div className="relative">
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
              <button
                type="button"
                onClick={() => {
                  handleReset('name');
                }}
                className="absolute right-2 top-[50%] translate-y-[-50%]"
              >
                <RotateCcwIcon className="cursor-pointer text-gray-250 hover:text-black" />
              </button>
            </div>
            {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <div className="relative">
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
              />
              <button
                type="button"
                onClick={() => {
                  handleReset('phone');
                }}
                className="absolute right-2 top-[50%] translate-y-[-50%]"
              >
                <RotateCcwIcon className="cursor-pointer text-gray-250 hover:text-black" />
              </button>
            </div>
            {errors.phone && <p className="text-error text-sm mb-1">{errors.phone.message}</p>}
          </div>

          <CheckBox
            id="editPassword"
            name="editPassword"
            label="비밀번호 변경하기"
            checked={isPasswordEditable}
            onChange={() => {
              setIsPasswordEditable((prev) => !prev);
            }}
          />

          {isPasswordEditable && (
            <div>
              <Input
                id="password"
                label="새 비밀번호"
                type="password"
                placeholder="영문, 숫자 포함 6자 이상 12자 이하"
                autoComplete="new-password"
                {...register('password', {
                  required: isPasswordEditable && '새 비밀번호를 입력해주세요.',
                  pattern: {
                    value: passwordExp,
                    message: '영문, 숫자 포함 6자 이상 12자 이하로 입력해주세요.',
                  },
                })}
              />
              {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
            </div>
          )}

          {isPasswordEditable && (
            <div>
              <Input
                id="checkPassword"
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해 주세요."
                autoComplete="off"
                {...register('checkPassword', {
                  required: isPasswordEditable && '비밀번호를 확인해주세요.',
                  validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
                })}
              />
              {errors.checkPassword && <p className="text-error text-sm mt-1">{errors.checkPassword.message}</p>}
            </div>
          )}
        </fieldset>

        <Button
          type="submit"
          shape="square"
          size="lg"
          bg={`${!isValid ? 'disabled' : 'white'}`}
          disabled={!isValid ? true : false}
        >
          완료
        </Button>
      </form>
    </>
  );
}

export default EditProfileForm;
