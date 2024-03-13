import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MyAccounts: React.FC = () => {
  const { data: userInfo } = useContext(UserContext);
  const [updateUserValues, setUpdateUserValues] = useState({
    nickname: '',
    profileImageUrl: '',
  });

  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      setUpdateUserValues({
        nickname: userInfo.nickname,
        profileImageUrl: userInfo.profileImageUrl,
      });
    }
  }, [userInfo]);

  const onChangeUpdateUserValues = e => {
    const id = e.target.id;
    const value = e.target.value;
    console.log(value);
    setUpdateUserValues(updateUserValues => ({
      ...updateUserValues,
      [id]: value,
    }));
  };

  const onSubmitForm = e => {
    e.preventDefault();
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
                  <Image
                    src="/images/basic-profile.svg"
                    width={182}
                    height={182}
                    priority={true}
                    alt="프로필 사진"
                  />
                ) : (
                  <img src={userInfo.profileImageUrl} alt="프로필 사진" />
                )}
                <div>
                  <div>이메일</div>
                  <input value={userInfo.email} />
                  <form onSubmit={onSubmitForm}>
                    <label htmlFor="newNickname">닉네임</label>
                    <div>
                      <input
                        type="text"
                        id="newNickname"
                        value={updateUserValues.nickname}
                        onChange={onChangeUpdateUserValues}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <button>저장</button>
            </div>
            <div>
              <h2>비밀번호 변경</h2>
              <form>
                <label htmlFor="password">현재 비밀번호</label>
                <div>
                  <input
                    type="password"
                    id="password"
                    value=""
                    placeholder="현재 비밀번호 입력"
                  />
                </div>
                <label htmlFor="newPassword">새 비밀번호</label>
                <div>
                  <input
                    type="password"
                    id="newPassword"
                    value=""
                    placeholder="새 비밀번호 입력"
                  />
                </div>
                <label htmlFor="newPwCheck">새 비밀번호 확인</label>
                <div>
                  <input
                    type="password"
                    id="newPwCheck"
                    value=""
                    placeholder="새 비밀번호 입력"
                  />
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
