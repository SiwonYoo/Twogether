import LinkButton from '@/components/common/LinkButton';

function Success() {
  return (
    <>
      <div className="min-h-full flex flex-col gap-4 items-center">
        <p className="text-center">
          환영합니다.
          <br />
          회원가입이 완료되었습니다.
        </p>
        <LinkButton href="/login" shape="square" lang="eng">
          LOGIN
        </LinkButton>
      </div>
    </>
  );
}

export default Success;
