import VerifyForm from '@/app/my-page/edit-profile/verify/VerifyForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인 정보 수정 - Twogether',
  description: 'Twogether의 개인 정보 수정 페이지입니다.',

  openGraph: {
    title: '개인 정보 수정 - Twogether',
    description: 'Twogether의 개인 정보 수정 페이지입니다.',
    url: '/my-page/edit-profile/verify',
  },
};

function Verify() {
  return (
    <>
      <div className="">
        <p className="text-center">정보 보호를 위해 이메일 인증이 필요합니다.</p>
        <p className="mb-5 text-xs text-gray-350 text-center">
          고객님의 소중한 정보를 안전하게 지키기 위한 단계입니다.
        </p>
        <VerifyForm />
      </div>
    </>
  );
}

export default Verify;
