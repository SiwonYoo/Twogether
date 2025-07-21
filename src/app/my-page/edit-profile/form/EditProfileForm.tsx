'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';

/* dummydata */
const user = {
  _id: 4,
  // login 타입이 email인데, id 대신 사용?
  email: 'u1@market.com',
  name: '제이지',
  phone: '01044445555',
  type: 'user',
  createdAt: '2025.07.17 13:26:59',
  updatedAt: '2025.07.12 10:26:59',
};

function EditProfileForm() {
  const router = useRouter();

  const handleSubmit = () => {
    /* 데이터 전송 */

    router.push('/my-page/edit-profile/success');
  };

  return (
    <>
      <form action={handleSubmit} className="flex flex-col gap-5">
        <fieldset className="contents">
          <legend className="sr-only">회원 정보 수정</legend>
          <Input
            id="userId"
            placeholder="영문, 숫자 포함 6자 이상"
            defaultValue={user.email}
            label="아이디"
            autoComplete="username"
          />
          <Input
            id="userPassword"
            type="password"
            placeholder="영문, 숫자 포함 8자 이상"
            label="새 비밀번호"
            autoComplete="new-password"
          />
          <Input
            id="checkUserPassword"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해 주세요."
            label="비밀번호 확인"
            autoComplete="off"
          />
          <Input
            id="userPhone"
            type="tel"
            placeholder="'-' 구분없이 입력"
            defaultValue={user.phone}
            label="휴대폰 번호"
            autoComplete="tel"
          />
        </fieldset>
        <Button type="submit" bg="white" shape="square" size="lg">
          완료
        </Button>
      </form>
    </>
  );
}

export default EditProfileForm;
