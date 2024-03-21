import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputUserInfo from '@/components/login/InputUserInfo';

const MyProfile: React.FC = ({ onSubmit, onChangeProfileImg }) => {
  const { data: userInfo } = useContext(UserContext);
  const [updateUserValues, setUpdateUserValues] = useState<string>({
    nickname: userInfo?.nickname,
    profileImageUrl: userInfo?.profileImageUrl,
  });

  const [updateProfileImg, setUpdateProfileImg] = useState<File | null>(null);

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

  const onChangeUpdateUserValues = e => {
    const id = e.target.id;
    const value = e.target.value;
    console.log(value);
    setUpdateUserValues({
      ...updateUserValues,
      [id]: value,
    });
  };

  const handleProfileImageChange = async e => {
    const file = e.target.files[0];
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

  const onSubmitForm = e => {
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
    <div className="bg-white-FFFFFF m-10">
      <div>
        {userInfo && (
          <div>
            <div className="">
              <h2 className="text-2xl font-bold">프로필</h2>
              <div className="flex flex-col mt-5">
                <div className="flex flex-row md:flex-col">
                  <div className="relative flex flex-col items-center justify-center">
                    <div className="w-[100px] md:w-[182px] h-[100px] md:h-[182px] overflow-hidden">
                      {updateUserValues.profileImageUrl ? (
                        <img src={updateUserValues.profileImageUrl} alt="프로필 사진" className="border rounded-md w-full h-full object-cover" />
                      ) : (
                        <div className="bg-gray-EEEEEE w-full h-full"></div>
                      )}
                    </div>
                    <div className="absolute ">
                      <label htmlFor="profileImageUrl">
                        <Image src="/images/profileimg-plus.svg" alt="이미지 업로드" width={30} height={30} className="w-[30px] h-[30px]" />
                      </label>
                      <input type="file" id="profileImageUrl" ref={fileInput} onChange={handleProfileImageChange} accept="image/*" className="hidden" />
                    </div>
                  </div>
                  <div>
                    <button onClick={handleBasicProfileImg}>기본 이미지</button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="">이메일</div>
                  <input value={userInfo.email} />
                  <form onSubmit={onSubmitForm}>
                    <label htmlFor="nickname">닉네임</label>
                    <div>
                      <input type="text" id="nickname" value={updateUserValues.nickname} onChange={onChangeUpdateUserValues} />
                    </div>
                  </form>
                </div>
              </div>
              <button onClick={onSubmitForm}>저장</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
