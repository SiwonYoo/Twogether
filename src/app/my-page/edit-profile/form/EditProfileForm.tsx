'use client';

import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { editProfile } from '@/data/actions/user';
import { getAllUsers } from '@/data/functions/user';
import useUserStore from '@/stores/useUserStore';
import { ApiRes, EditProfileType, GetAllUsersType } from '@/types';
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
  const [userList, setUserList] = useState<GetAllUsersType[]>([]);
  const [isPhoneAvailable, setPhoneAvailable] = useState<boolean | null>(null);
  const setUser = useUserStore((state) => state.login);
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    getValues,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<EditProfileType>({
    mode: 'onTouched',
    criteriaMode: 'firstError',
  });

  // 첫 렌더링 시 유저 정보 GET
  useEffect(() => {
    async function getUserList() {
      const data = await getAllUsers();
      if (data.ok) setUserList(data.item);
    }
    getUserList();
  }, []);

  // 기존 정보로 초기화
  useEffect(() => {
    if (user) {
      reset({ accessToken: user.token?.accessToken, _id: user._id, name: user.name, phone: user.phone });
    }
  }, [user]);

  // 휴대폰 중복 확인 (실시간, 정규식 만족 시)
  useEffect(() => {
    const currentPhone = getValues('phone');
    if (currentPhone === user?.phone) return;
    if (!phoneExp.test(currentPhone)) return;

    let isPhoneDuplicated = false;

    userList.map((item) => {
      if (item.phone === getValues('phone')) {
        setPhoneAvailable(false);
        isPhoneDuplicated = true;
      }
    });

    if (!isPhoneDuplicated) setPhoneAvailable(true);
  }, [watch('phone')]);

  // isPasswordEditable 변화 시 유효성 재검사를 위해 항상 valid한 _id 필드를 트리거함
  useEffect(() => {
    trigger('_id');
  }, [isPasswordEditable]);

  // name, phone 필드 초기화 (reset 버튼 클릭 시)
  const handleReset = (field: 'name' | 'phone') => {
    if (!user) return;
    resetField(field);
  };

  // 폼 제출 이벤트 ('완료' 버튼 클릭 시)
  const onSubmit = async (editData: EditProfileType) => {
    if (!user) return;
    if (!isPhoneAvailable) {
      alert('이미 등록된 휴대폰 번호입니다. 다시 입력해 주세요.');
      return;
    }

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
            {errors.phone && <p className="text-error text-sm mt-1">{errors.phone.message}</p>}
            {!errors.phone && isPhoneAvailable && <p className="text-success text-sm mt-1">사용 가능한 번호입니다.</p>}
            {!errors.phone && isPhoneAvailable === false && (
              <p className="text-error text-sm mt-1">이미 등록된 번호입니다.</p>
            )}
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
