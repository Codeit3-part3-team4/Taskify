'use client';

import { UserInfo, getUserInfo, updateUserInfoApi, updateUserProfileImgApi } from '@/api/userApi';
import { UserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import LoginPage from '../login/page';
import MyProfile from './(components)/MyProfile';
import { changePasswordApi } from '@/api/AuthApi';
import MyPassword from './(components)/MyPassword';
import SideDashboardList from '@/components/SideDashboardList/SideDashboardList';

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUpdateUserSubmit = async updateUserValues => {
    try {
      await updateUserInfoApi(updateUserValues);
      console.log('계정관리페이지 닉넴,프로필 변경', updateUserValues);
    } catch (error) {
      console.error('유저 정보 저장 실패:', error);
    }
  };

  const handleChangeProfileImg = async updateProfileImg => {
    try {
      const imageUrl = await updateUserProfileImgApi(updateProfileImg);
      console.log('계정관리 페이지 프로필 이미지 변경', updateProfileImg);
      console.log('이미지 api 추가다!!!!', imageUrl);

      return imageUrl.profileImageUrl;
    } catch (error) {
      console.error('프로필이미지 변경 실패', error);
    }
  };

  const handleChangePassword = async changePassword => {
    try {
      const res = await changePasswordApi(changePassword);
      console.log('지금 추가', JSON.stringify(changePassword));
      console.log(JSON.stringify(res));

      console.log('비밀번호 변경 성공:', res);
    } catch (error) {
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
        {userInfo.id ? (
          <div className="flex flex-col bg-gray-EEEEEE">
            <div className="h-[37px] w-[284px] md:w-[544px] lg:w-[620px] ml-3 md:ml-5">{'< 돌아가기'}</div>
            <div className="flex flex-col w-[284px] md:w-[544px] lg:w-[620px] mt-5 ml-3 md:ml-5">
              <div>
                <MyProfile onSubmit={handleUpdateUserSubmit} onChangeProfileImg={handleChangeProfileImg} />
              </div>
              <div>
                <MyPassword onSubmit={handleChangePassword} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <LoginPage />
          </div>
        )}
      </UserContext.Provider>
    </div>
  );
}
