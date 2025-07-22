'use client';

import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { login } from '@/data/actions/user';
import useUserStore from '@/stores/useUserStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

function LoginForm() {
  const [userState, formAction, isLoading] = useActionState(login, null);
  const router = useRouter();

  const setUser = useUserStore((state) => state.login);

  useEffect(() => {
    if (userState?.ok) {
      setUser({
        _id: userState.item._id,
        email: userState.item.email,
        name: userState.item.name,
        type: userState.item.type,
        // image
        token: {
          accessToken: userState.item.token?.accessToken || '',
          refreshToken: userState.item.token?.refreshToken || '',
        },
        loginType: 'email',
      });

      alert('로그인이 완료되었습니다.');

      /* redirect 추가 예정 (우선 router.back으로 이동) */
      router.back(); // 이전 페이지로 이동
    } else {
      if (!userState?.errors && userState?.message) {
        console.error('로그인 에러');
      }
    }
  }, [userState]);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-2 mt-14 mb-4">
        <fieldset className="contents">
          <legend className="sr-only">로그인</legend>

          <Input id="email" label="아이디" placeholder="ID" hideLabel={true} autoComplete="username" />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="PASSWORD"
            hideLabel={true}
            autoComplete="current-password"
          />

          <div className="flex justify-between mt-4 mb-11">
            <CheckBox id="rememberUserId" name="rememberUserId" label="아이디 저장" fontSize="sm" />
            <p className="text-sm">
              <Link href="#">아이디 찾기</Link> | <Link href="#">비밀번호 찾기</Link>
            </p>
          </div>
        </fieldset>
        <Button type="submit" shape="square" size="lg">
          로그인
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
