import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import React from 'react';

const MyAccounts: React.FC = () => {
  const { data: userInfo } = useContext(UserContext);

  return (
    <div>
      <h2>프로필</h2>
      {userInfo && (
        <div>
          <div>이메일</div>
          <input value={userInfo.email} />
          <div>닉네임</div>
          <input value={userInfo.nickname} />
        </div>
      )}
    </div>
  );
};

export default MyAccounts;
