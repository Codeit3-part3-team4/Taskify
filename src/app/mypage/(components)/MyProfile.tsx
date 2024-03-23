import { UserContext } from '@/context/UserContext';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { UpdateUserInfo } from '../page';
import { Url } from 'next/dist/shared/lib/router/router';

interface UpdateUserValues {
  nickname: string;
  profileImageUrl: string | null | File | Url;
}

interface MyProfileProps {
  onSubmit: (value: UpdateUserInfo) => void;
  onChangeProfileImg: (file: File) => Promise<string | null | Url>;
}

const MyProfile: React.FC<MyProfileProps> = ({ onSubmit, onChangeProfileImg }: MyProfileProps) => {
  const { data: userInfo } = useContext(UserContext);
  const [updateUserValues, setUpdateUserValues] = useState<UpdateUserValues>({
    nickname: userInfo?.nickname || '',
    profileImageUrl: userInfo?.profileImageUrl || null,
  });

  const [updateProfileImg, setUpdateProfileImg] = useState<File | null | Url>(null);

  // const BasicImage = '/images/basic-profile.svg';

  console.log(userInfo);

  const fileInput = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setUpdateUserValues({
        nickname: userInfo.nickname,
        profileImageUrl: userInfo.profileImageUrl,
      });
      console.log('1 유저인포 프로필:' + updateUserValues.profileImageUrl);
    }
  }, []);

  const onChangeUpdateUserValues = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    console.log(value);
    setUpdateUserValues({
      ...updateUserValues,
      [id]: value,
    });
  };

  const handleProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUpdateProfileImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // 이미지 파일이 아니라 데이터 URL
      const value = reader.result;

      console.log('userinfo', updateUserValues);

      console.log('이미지 업뎃,', file);
      console.log('이미지 업뎃,', updateProfileImg);
    };
    const imageUrl = await onChangeProfileImg(file);
    console.log();
    setUpdateUserValues({
      ...updateUserValues,
      profileImageUrl: imageUrl,
    });
    console.log('프로필 업로드해보자 : ', updateUserValues);
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(updateUserValues);
    console.log('api로 프로필 변경 데이터 보내줌: ' + updateUserValues);

    console.log('프로필업뎃:' + updateUserValues);
  };

  const handleBasicProfileImg = () => {
    setUpdateProfileImg(null);
    console.log('원래 프로필 이미지:' + updateUserValues.profileImageUrl);
    setUpdateUserValues({
      ...updateUserValues,
      profileImageUrl: null,
    });
    console.log('기본 이미지로 변경한 후:' + updateUserValues.profileImageUrl);
  };

  return (
    <div>
      {userInfo && (
        <div id="프로필컨테이너" className="flex justify-center items-center h-[422px] md:h-[385px] rounded-lg bg-white-FFFFFF pr-5">
          <div className="flex flex-col ml-3 md:ml-5">
            <h2 className="text-xl md:text-2xl font-bold">프로필</h2>
            <div id="프로필이미지+이메일+닉넴" className="flex flex-col md:flex-row mt-6 md:mt-8">
              <div id="프로필이미지+기본이미지버튼 영역" className="flex flex-row md:flex-col">
                <div id="프로필이미지 영역" className="relative flex flex-col items-center justify-center">
                  <div id="프로필이미지" className="w-[100px] md:w-[182px] h-[100px] md:h-[182px] overflow-hidden">
                    {updateUserValues.profileImageUrl ? (
                      <img src={updateUserValues.profileImageUrl} alt="프로필 사진" className="border rounded-md w-full h-full object-cover" />
                    ) : (
                      <div className="bg-gray-EEEEEE w-full h-full"></div>
                    )}
                  </div>
                  <div id="+버튼" className="absolute ">
                    <label htmlFor="profileImageUrl">
                      <Image src="/images/profileimg-plus.svg" alt="이미지 업로드" width={30} height={30} className="w-[30px] h-[30px]" />
                    </label>
                    <input type="file" id="profileImageUrl" ref={fileInput} onChange={handleProfileImageChange} accept="image/*" className="hidden" />
                  </div>
                </div>
                <div className="flex flex-col ml-2 md:ml-0 md:mt-3 lg:mt-4">
                  <button
                    onClick={handleBasicProfileImg}
                    className="bg-gray-9FA6B2 rounded p-1 md:p-0 text-white text-xs md:text-sm md:h-[32px]  hover:bg-primary-BASIC"
                  >
                    기본 프로필
                  </button>
                </div>
              </div>

              <div id="이메일+닉네임 영역" className="flex flex-col md:ml-4">
                <div id="이메일 영역" className="mt-6 md:mt-0">
                  <div className="font-semibold">이메일</div>
                  <input
                    value={userInfo.email}
                    className="w-[244px] md:w-[290px] lg:w-[366px] h-[42px] md:h-[48px] lg:h-[48px] mt-[10px] border-solid border-[1px] rounded-md text-sm md:text-base pl-4 text-gray-9FA6B2"
                  />
                </div>
                <div id="닉네임 영역" className="mt-4 md:mt-5">
                  <form onSubmit={onSubmitForm}>
                    <label htmlFor="nickname" className="font-semibold">
                      닉네임
                    </label>
                    <div>
                      <input
                        type="text"
                        id="nickname"
                        value={updateUserValues.nickname}
                        onChange={onChangeUpdateUserValues}
                        className="w-[244px] md:w-[290px] lg:w-[366px] h-[42px] md:h-[48px] lg:h-[48px] mt-[10px] border-solid border-[1px] rounded-md text-sm md:text-base pl-4"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={onSubmitForm} className="bg-primary-BASIC text-white w-[84px] h-[28px] md:h-[32px] rounded mt-4 hover:scale-105">
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
