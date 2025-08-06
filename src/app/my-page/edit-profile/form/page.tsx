import EditProfileForm from '@/app/my-page/edit-profile/form/EditProfileForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인 정보 수정 - Twogether',
  description: 'Twogether의 개인 정보 수정 페이지입니다.',

  openGraph: {
    title: '개인 정보 수정 - Twogether',
    description: 'Twogether의 개인 정보 수정 페이지입니다.',
    url: '/my-page/edit-profile/form',
  },
};

function Form() {
  return (
    <>
      <div className="">
        <p className="text-center">개인 정보를 입력해 주세요.</p>
        <p className="mb-5 text-xs text-gray-350 text-center">[완료] 버튼을 누르면 입력하신 정보가 반영됩니다. </p>
        <EditProfileForm />
      </div>
    </>
  );
}

export default Form;
