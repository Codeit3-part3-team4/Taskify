'use client';

import { UserInfo, UserSignUp, getUserInfo, updateUserInfoApi, updateUserProfileImgApi } from '@/api/userApi';
import { UserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import LoginPage from '../login/page';
import MyProfile from './(components)/MyProfile';
import { changePasswordApi } from '@/api/AuthApi';
// import MyPassword from './(components)/Mypassword';
import Layout from '../dashboard/layout';
import { useRouter } from 'next/navigation';
import MyPassword from './(components)/Mypassword';

export interface UpdateUserInfo {
  email?: string;
  nickname?: string;
  profileImageUrl: string | null;
}

export interface MyPasswordValue {
  password: string;
  newPassword: string;
}

interface ChangePw {}
export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleUpdateUserSubmit = async (updateUserValues: UpdateUserInfo) => {
    try {
      await updateUserInfoApi(updateUserValues);
      console.log('계정관리페이지 닉넴,프로필 변경', updateUserValues);
    } catch (error) {
      console.error('유저 정보 저장 실패:', error);
    }
  };

  const handleChangeProfileImg = async (updateProfileImg: File) => {
    try {
      const imageUrl = await updateUserProfileImgApi(updateProfileImg);
      console.log('계정관리 페이지 프로필 이미지 변경', updateProfileImg);
      console.log('이미지 api 추가다!!!!', imageUrl);

      return imageUrl.profileImageUrl;
    } catch (error) {
      console.error('프로필이미지 변경 실패', error);
    }
  };

  const handleChangePassword = async (changePassword: MyPasswordValue) => {
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
        {userInfo?.id ? (
          <Layout>
            <div className="flex flex-col mt-24">
              <button onClick={handleGoBack} className="h-[37px] w-[284px] md:w-[544px] lg:w-[620px] ml-3 md:ml-5">
                <div className="flex flex-row items-center hover:scale-105 transition-all">
                  <img src="/images/arrow-forward-left.svg" width="18" height="18" alt="arrow-left" />
                  <strong className="text-sm">돌아가기</strong>
                </div>
              </button>
              {/* <DashboardBack /> */}
              <div className="flex flex-col lg:flex-row items-start w-[284px] md:w-[544px] lg:w-[620px] mt-5 ml-3 md:ml-5 gap-5">
                <MyProfile onSubmit={handleUpdateUserSubmit} onChangeProfileImg={handleChangeProfileImg} />
                <MyPassword onSubmit={handleChangePassword} />
              </div>
            </div>
          </Layout>
        ) : (
          <div>
            <LoginPage />
          </div>
        )}
      </UserContext.Provider>
    </div>
  );
}
