import LinkButton from '@/components/common/LinkButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원 정보 수정 - Twogether',
  openGraph: {
    title: '회원 정보 수정 - Twogether',
    description: '회원 정보 수정 성공',
    url: '/my-page/edit-profile/success',
  },
};

function Success() {
  return (
    <>
      <div className="min-h-full flex flex-col gap-4 items-center">
        <p className="text-center">
          회원정보 수정이 완료되었습니다.
          <br />
          쇼핑을 즐겨주세요.
        </p>
        <div className="flex gap-4 mt-11 w-full">
          <LinkButton href="/my-page" shape="square" size="lg" bg="white" lang="eng">
            MY PAGE
          </LinkButton>
          <LinkButton href="/" shape="square" size="lg" lang="eng">
            HOME
          </LinkButton>
        </div>
      </div>
    </>
  );
}

export default Success;
