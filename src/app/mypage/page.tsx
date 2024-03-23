'use client';

import { UserInfo, getUserInfo, updateUserInfoApi, updateUserProfileImgApi } from '@/api/userApi';
import { UserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import LoginPage from '../login/page';
import MyProfile from './(components)/MyProfile';
import { changePasswordApi } from '@/api/AuthApi';
import Layout from '../dashboard/layout';
import { useRouter } from 'next/navigation';
import MyPassword from './(components)/Mypassword';
import Modal from '@/components/Modal/Modal';

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
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isPwSaveModalOpen, setIsPwSaveModalOpen] = useState<boolean>(false);
  const [isFailPwSaveModalOpen, setIsFailPwSaveModalOpen] = useState<boolean>(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleUpdateUserSubmit = async (updateUserValues: UpdateUserInfo) => {
    try {
      await updateUserInfoApi(updateUserValues);
      setIsSaveModalOpen(true);
    } catch (error) {}
  };

  const handleChangeProfileImg = async (updateProfileImg: File) => {
    try {
      const imageUrl = await updateUserProfileImgApi(updateProfileImg);
      return imageUrl.profileImageUrl;
    } catch (error) {}
  };

  const handleChangePassword = async (changePassword: MyPasswordValue) => {
    try {
      const res = await changePasswordApi(changePassword);
      if (res) {
        setIsPwSaveModalOpen(true);
      } else {
        setIsFailPwSaveModalOpen(true);
      }
    } catch (error) {
      console.error('비밀번호 변경 실패', error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('마이페이지 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const closeSaveModal = () => {
    setIsSaveModalOpen(false);
  };
  const closeFailPwSaveModal = () => {
    setIsFailPwSaveModalOpen(false);
  };
  const closePwSaveModal = () => {
    setIsPwSaveModalOpen(false);
  };

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
                {isSaveModalOpen && <Modal isOpen={isSaveModalOpen} onClose={closeSaveModal} title="My Page" children="프로필 저장 완료" />}
                <MyPassword onSubmit={handleChangePassword} />
                {isPwSaveModalOpen && <Modal isOpen={isPwSaveModalOpen} onClose={closePwSaveModal} title="My Page" children="비밀번호 변경 완료" />}
                {isFailPwSaveModalOpen && <Modal isOpen={isFailPwSaveModalOpen} onClose={closeFailPwSaveModal} title="My Page" children="비밀번호 변경 실패" />}
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
