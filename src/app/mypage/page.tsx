'use client';

import { UserInfo, getUserInfo, updateUserInfo, updateUserProfileImg } from '@/api/userApi';
import { UserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import LoginPage from '../login/page';
import MyProfile from './(components)/MyProfile';
import { changePasswordApi } from '@/api/AuthApi';
import MyPassword from './(components)/MyPassword';

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUpdateUserSubmit = async updateUserValues => {
    try {
      await updateUserInfo(updateUserValues);
      console.log('계정관리페이지 닉넴,프로필 변경', updateUserValues);
    } catch (error) {
      console.error('유저 정보 저장 실패:', error);
    }
  };

  const handleChangeProfileImg = async changeProfileImg => {
    try {
      await updateUserProfileImg(changeProfileImg);
      console.log('계정관리 페이지 프로필 이미지 변경', changeProfileImg);
    } catch (error) {
      console.error('프로필이미지 변경 실패', error);
    }
  };

  const handleChangePassword = async changePassword => {
    try {
      const res = await changePasswordApi(changePassword);
      console.log(res.ok);

      console.log('비밀번호 변경 성공:', res);
    } catch (error) {
      console.log('안돼');
      console.error('비밀번호 변경 실패', error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);

        console.log('마이페이지 성공', data);
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
        {userInfo ? (
          <div>
            <MyProfile onSubmit={handleUpdateUserSubmit} onChangeProfileImg={handleChangeProfileImg} />

            <MyPassword onSubmit={handleChangePassword} />
          </div>
        ) : (
          <LoginPage />
        )}
      </UserContext.Provider>
    </div>
  );
}
