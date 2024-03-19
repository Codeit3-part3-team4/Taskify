import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MyAccounts: React.FC = ({ onSubmit }) => {
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

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(updateUserValues);
    console.log('업뎃:' + updateUserValues);
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
                  <img src={userInfo.profileImageUrl} alt="프로필 사진" />
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
            <div>
              <h2>비밀번호 변경</h2>
              <form>
              <div>
          <InputUserInfo
            label={'비밀번호 확인'}
            id={'pwCheck'}
            type={typeValue()}
            value={newUserValues.pwCheck}
            password={true}
            placeholder={'비밀번호를 한번 더 입력해 주세요'}
            onChange={onChangeSignupSubmit}
            onBlur={onBlur}
            handlePasswordLook={handlePasswordLook}
            error={errors.pwCheck}
          />
        </div>
                <label htmlFor="password">현재 비밀번호</label>
                <div>
                  <input type="password" id="password" value="" placeholder="현재 비밀번호 입력" />
                </div>
                <label htmlFor="newPassword">새 비밀번호</label>
                <div>
                  <input type="password" id="newPassword" value="" placeholder="새 비밀번호 입력" />
                </div>
                <label htmlFor="newPwCheck">새 비밀번호 확인</label>
                <div>
                  <input type="password" id="newPwCheck" value="" placeholder="새 비밀번호 입력" />
                </div>
              </form>
              <button>변경</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccounts;
