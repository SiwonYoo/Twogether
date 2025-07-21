'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';

function Form() {
  const router = useRouter();

  const submitHandler = () => {
    /* 데이터 전송 로직 작성*/

    router.push('/signup/success');
  };

  return (
    <>
      <div className="px-4">
        <form action={submitHandler} className="flex flex-col gap-4 mb-4">
          <fieldset className="contents">
            <legend className="sr-only">회원가입</legend>
            <Input id="userName" label="이름" placeholder="실명을 입력해 주세요." />
            <Input id="userId" label="아이디" placeholder="영문, 숫자 포함 6자 이상">
              <Button bg="white" shape="square">
                중복 확인
              </Button>
            </Input>
            <Input id="userPassword" label="비밀번호" type="password" placeholder="영문, 숫자 포함 8자 이상" />
            <Input
              id="checkUserPassword"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해 주세요."
            />
            <Input id="userPhone" type="number" label="휴대폰 번호" placeholder="'-' 구분없이 입력" />
            <div className="flex gap-5 mt-11">
              <Button
                onClick={() => {
                  router.back();
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
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default Form;
