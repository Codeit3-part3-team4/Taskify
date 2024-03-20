import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputUserInfo from '@/components/login/InputUserInfo';

const MyProfile: React.FC = ({ onSubmit, onChangeProfileImg }) => {
  const { data: userInfo } = useContext(UserContext);
  const [updateUserValues, setUpdateUserValues] = useState({
    // nickname: '',
    // profileImageUrl: '',
    nickname: userInfo?.nickname,
    profileImageUrl: userInfo?.profileImageUrl,
  });

  console.log(userInfo);

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
    const reader = new FileReader();

    reader.onloadend = () => {
      setUpdateUserValues({
        ...updateUserValues,
        profileImageUrl: reader.result,
      });
      onChangeProfileImg(updateUserValues.profileImageUrl);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(updateUserValues);

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
                {userInfo.profileImageUrl === null ? (
                  <Image src="/images/basic-profile.svg" width={182} height={182} priority={true} alt="프로필 사진" />
                ) : (
                  <div>
                    <img src={userInfo.profileImageUrl} alt="프로필 사진" />
                    <div>
                      <button>
                        <img src="/images/prifileimg-plus" alt="이미지 업로드" />
                      </button>
                    </div>
                    <input type="file" id="profileImageUrl" onChange={handleProfileImageChange} accept="image/*" placeholder="업로드" />
                  </div>
                )}
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
