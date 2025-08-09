'use client';

import Alert from '@/app/shop/[productType]/[id]/Alert';
import Button from '@/components/common/Button';
import { editProfileImage } from '@/data/actions/user';
import useUserStore from '@/stores/useUserStore';
import { SwitchCamera } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function EditProfileImage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.login);
  const [profileImage, setProfileImage] = useState('/images/icon/default_profile.svg');
  const [isOpen, setOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (user?.image) setProfileImage(`${user?.image}`);
  }, [user]);

  const fileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !user || !user._id) return;

    const uploadImage = event.target.files?.[0];

    // 최대 용량 설정
    const maxSizeKB = 300;
    const maxSizsBytes = maxSizeKB * 1024;
    if (uploadImage.size > maxSizsBytes) {
      setAlertMessage(`파일 크기는 ${maxSizeKB}KB 이하만 업로드 가능합니다.`);
      setIsAlertOpen(true);
      event.target.value = '';
      return;
    }

    setOpen(false);
    setProfileImage('/images/icon/profile_loading.gif');

    const data = {
      accessToken: user.token?.accessToken || '',
      _id: user._id,
      imageFile: uploadImage,
    };

    const res = await editProfileImage(data);
    if (res.ok) {
      setUser({ ...user, image: res.item.image });
      setProfileImage(`${res.item.image}`);
    } else {
      setProfileImage('/images/icon/default_profile.svg');
    }
  };

  const deleteImage = async () => {
    if (!user || !user._id) return;

    const data = {
      accessToken: user.token?.accessToken || '',
      _id: user._id,
      imageFile: null,
    };

    const res = await editProfileImage(data);
    if (res.ok) {
      setProfileImage('/images/icon/default_profile.svg');
      setUser({ ...user, image: null });
    } else {
      console.error('기본 이미지 등록에 실패했습니다.');
    }

    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="relative cursor-pointer"
      >
        <Image
          src={`${profileImage}`}
          width={44}
          height={44}
          alt="프로필 이미지"
          className="aspect-square rounded-full object-cover bg-pri"
          onError={() => {
            setProfileImage('/images/icon/default_profile.svg');
          }}
        />
        <SwitchCamera size={20} className="absolute right-0 bottom-0 p-0.5 rounded-full bg-white" />
      </button>

      <div
        hidden={!isOpen}
        onClick={() => {
          setOpen(false);
        }}
        className="fixed flex h-dvh min-w-[400px] max-w-[768px] mx-auto inset-0 items-end bg-black/50 z-10"
      >
        <div
          role="dialog"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
          className="p-8 w-[100%] h-[20%] rounded-t-4xl bg-white z-10 animate-fade-in"
        >
          <h2 className="text-xl font-bold mb-5 text-center">프로필 이미지를 변경하시겠습니까?</h2>
          <div className="flex gap-5">
            <Button size="lg" shape="square" bg="white" onClick={deleteImage}>
              기본 이미지
            </Button>
            <label htmlFor="profileImage" className="contents">
              <div className="px-6 py-2 w-full cursor-pointer bg-primary text-white text-center">사진 선택</div>
            </label>
            <input id="profileImage" type="file" accept="image/*" onChange={fileChange} hidden />
          </div>
        </div>
      </div>

      <Alert isOpen={isAlertOpen} setOpen={setIsAlertOpen}>
        <p className="break-keep text-center">{alertMessage}</p>
      </Alert>
    </>
  );
}

export default EditProfileImage;
