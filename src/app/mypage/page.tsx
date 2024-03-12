'use client';

import { UserInfo, getUserInfo } from '@/api/userApi';
import MyAccounts from '@/components/mypage/myaccounts';
import { UserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const fetchUserInfo = async () => {
      try {
        if (token) {
          const data = await getUserInfo(token);
          setUserInfo(data);
        }
      } catch (error) {
        console.error('마이페이지 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ data: userInfo, setData: setUserInfo }}>
        <MyAccounts />
      </UserContext.Provider>
    </div>
  );
}
