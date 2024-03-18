'use client';

import { UserInfo, getUserInfo, updateUserInfo } from '@/api/userApi';
import MyAccounts from '@/components/mypage/myaccounts';
import { UserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import LoginPage from '../login/page';

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUpdateUserSubmit = async updateUserValues => {
    try {
      await updateUserInfo(updateUserValues);
    } catch (error) {
      console.error('유저 정보 저장 실패:', error);
    }
  };

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserContext.Provider value={{ data: userInfo, setData: setUserInfo }}>
        {userInfo ? <MyAccounts onSubmit={handleUpdateUserSubmit} /> : <LoginPage />}
      </UserContext.Provider>
    </div>
  );
}
