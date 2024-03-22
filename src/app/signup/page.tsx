'use client';

import SignUp from './(components)/Signup';
import { useRouter } from 'next/navigation';
import MainLogo from '@/components/login/MainLogo';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { UserSignUp } from '@/api/userApi';

export default function SignUpPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSignUpSubmit = async (newUserValues: UserSignUp): Promise<void> => {
    try {
      const res = await signupApi(newUserValues);
      if (res.ok) {
        alert('가입이 완료되었습니다');
        router.push('/login');
      } else if (res.status === 409) {
        console.log('회원가입페이지 409');
        setIsModalOpen(true);
        console.log('모달켜짐');
      }
      console.log('res' + res);
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
