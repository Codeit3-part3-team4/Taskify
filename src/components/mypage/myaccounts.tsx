import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import React from 'react';
import Image from 'next/image';
// import basicProfile from '../../../public/images/basic-profile.svg';

const MyAccounts: React.FC = () => {
  const { data: userInfo } = useContext(UserContext);

  console.log(userInfo);

  return (
    <div>
      <div>
        <h2>프로필</h2>
        {userInfo && (
          <div>
            <div>
              {userInfo.profileImageUrl === null ? (
                <Image
                  src="/images/basic-profile.svg"
                  width={182}
                  height={182}
                />
              ) : (
                <img src={userInfo.profileImageUrl} alt="프로필 사진" />
              )}
              <div>
                <div>이메일</div>
                <input value={userInfo.email} />
                <form>
                  <div>닉네임</div>
                  <input value={userInfo.nickname} />
                </form>
              </div>
            </div>
            <button>저장</button>
          </div>
        )}
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
  );
};

export default MyAccounts;
