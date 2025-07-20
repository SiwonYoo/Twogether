import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import LinkButton from '@/components/common/LinkButton';
import { Metadata } from 'next';
import { Judson } from 'next/font/google';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export const metadata: Metadata = {
  title: '로그인 - Twogether',
  openGraph: {
    title: '로그인 - Twogether',
    description: '로그인',
    url: '/login',
  },
};

function Login() {
  return (
    <>
      <main>
        <h2 className={`mt-5 text-2xl text-center ${JudsonFont.className}`}>LOGIN</h2>
        <div className="px-4">
          <form action="" className="flex flex-col gap-2 mt-14 mb-4">
            <fieldset className="contents">
              <legend className="sr-only">로그인</legend>

              <Input id="userId" label="아이디" placeholder="ID" hideLabel={true} autoComplete="username" />
              <Input
                id="userPassword"
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

          <LinkButton href="/signup/terms" shape="square" size="lg" bg="secondary">
            회원가입
          </LinkButton>
        </div>
      </main>
    </>
  );
}

export default Login;
