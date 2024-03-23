'use client';

import { UserSignUp, signupApi } from '@/api/userApi';
import SignUp from './(components)/Signup';
import { useRouter } from 'next/navigation';
import MainLogo from '@/components/login/MainLogo';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';

export default function SignUpPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignUpSubmit = async (newUserValues: UserSignUp): Promise<void> => {
    try {
      const res = await signupApi(newUserValues);
      if (!res) {
        return;
      }
      if (res.ok) {
        alert('가입이 완료되었습니다');
        router.push('/login');
      } else if (res.status === 409) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('회원가입 페이지 실패:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <MainLogo title={'첫 방문을 환영합니다!'} />
      <SignUp onSubmit={handleSignUpSubmit} />
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} title="이메일 중복" children="이미 사용중인 이메일입니다" />}
    </div>
  );
}
