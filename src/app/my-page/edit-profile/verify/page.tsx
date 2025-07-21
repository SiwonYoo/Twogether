import Input from '@/components/common/Input';
import LinkButton from '@/components/common/LinkButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원 정보 수정 - Twogether',
  openGraph: {
    title: '회원 정보 수정 - Twogether',
    description: '회원 정보 수정 본인 확인',
    url: '/my-page/edit-profile/verify',
  },
};

function Verify() {
  return (
    <>
      <div className="">
        <p className="text-center">정보 보호를 위해 비밀번호를 다시 입력해 주세요.</p>
        <p className="mb-5 text-xs text-gray-350 text-center">
          회원님의 소중한 정보를 안전하게 지키기 위한 단계입니다.
        </p>
        <form className="flex flex-col gap-5">
          <input type="text" name="username" autoComplete="username" className="hidden" aria-hidden />
          <Input
            id="password"
            type="password"
            placeholder="PASSWORD"
            label="비밀번호"
            hideLabel={true}
            autoComplete="current-password"
          />
          <LinkButton href="/my-page/edit-profile/form" bg="white" shape="square" size="lg">
            다음
          </LinkButton>
        </form>
      </div>
    </>
  );
}

export default Verify;
