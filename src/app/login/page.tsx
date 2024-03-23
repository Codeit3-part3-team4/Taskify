'use client';

import { loginApi, postRequestCookies } from '@/api/AuthApi';
import MainLogo from '@/components/login/MainLogo';
import { useRouter } from 'next/navigation';
import { authInstance } from '@/utils/functionalFetch';
import Login, { Login as LoginProps } from './(components)/Login';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';

interface UserValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isFailLoginModalOpen, setIsFailLoginModalOpen] = useState<boolean>(false);
  const [isModalMessage, setIsModalMessage] = useState<any>('');

  const handleLoginSubmit = async (userValues: UserValues): Promise<void> => {
    const res = await loginApi(userValues);

    if (res && res.accessToken) {
      authInstance.setOptions({
        headers: {
          Authorization: `Bearer ${res.accessToken}`,
        },
      });
      postRequestCookies('accessToken', res.accessToken);
      router.push('/dashboard/mydashboard');
    } else {
      setIsModalMessage(res);
      setIsFailLoginModalOpen(true);
    }
  };

  const closeFailLoginModal = () => {
    setIsFailLoginModalOpen(false);
  };

  const url = '/images/mokoko-bg.png';

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div style={{ backgroundImage: `url(${url})`, opacity: '0.3', backgroundSize: 'cover', backgroundRepeat: 'repeat', backgroundPosition: 'center' }} />
      <MainLogo title={'오늘도 만나서 반가워요!'} />
      <Login onSubmit={handleLoginSubmit} />
      {isFailLoginModalOpen && <Modal isOpen={isFailLoginModalOpen} onClose={closeFailLoginModal} title="Login" children={isModalMessage} />}
    </div>
  );
}
