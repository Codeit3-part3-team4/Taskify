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

  console.log(userInfo);

  const fileInput = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setUpdateUserValues({
        nickname: userInfo.nickname,
        profileImageUrl: userInfo.profileImageUrl,
      });
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

  const handleProfileImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // 이미지 파일이 아니라 데이터 URL
      const value = reader.result;
      setUpdateProfileImg({
        profileImageUrl: file,
      });
      console.log('userinfo', updateUserValues);

      console.log('이미지 업뎃,', file);
      console.log('이미지 업뎃,', updateProfileImg);
    };
    onChangeProfileImg(file);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(updateUserValues);
    // if (updateProfileImg) {
    //   onChangeProfileImg(updateProfileImg);
    // }

    console.log('프로필업뎃:' + updateUserValues);
  };

  return (
    <div>
      <div>
        {userInfo && (
          <div>
            <div>
              <h2>프로필</h2>
              <div>
                <img src={userInfo.profileImageUrl} alt="프로필 사진 " width={182} height={182} />
                {/* {userInfo.profileImageUrl === null ? (
                  <Image src="/images/basic-profile.svg" width={182} height={182} priority={true} alt="프로필 사진" />
                ) : (
                  <div>
                    <img src={updateUserValues.profileImageUrl} alt="프로필 사진" />
                    <div>
                      <input type="file" id="profileImageUrl" onChange={handleProfileImageChange} accept="image/*" placeholder="업로드" />
                    </div>
                  </div>
                )} */}
                <a href="#" onClick={() => fileInput.current.click()}>
                  <img src={'/images/profileimg-plus'} alt="이미지 업로드" width={15} height={15} />
                </a>
                <label htmlFor="profileImageUrl">이미지 선택</label>
                <input type="file" id="profileImageUrl" ref={fileInput} onChange={handleProfileImageChange} accept="image/*" />

                <div>
                  <div>이메일</div>
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
