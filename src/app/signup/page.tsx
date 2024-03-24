'use client';

import { UserSignUp, signupApi } from '@/api/userApi';
import SignUp from './(components)/Signup';
import { useRouter } from 'next/navigation';
import MainLogo from '@/components/login/MainLogo';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';

export default function SignUpPage() {
  const router = useRouter();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isFailSignupModalOpen, setIsFailSignupModalOpen] = useState(false);

  const handleSignUpSubmit = async (newUserValues: UserSignUp): Promise<void> => {
    try {
      const res = await signupApi(newUserValues);
      if (!res) {
        return;
      }
      if (res.ok) {
        setIsSignupModalOpen(true);
        setTimeout(() => setIsSignupModalOpen(false), 500);
        setTimeout(() => router.push('/login'), 500);
      } else if (res.status === 409) {
        setIsFailSignupModalOpen(true);
      }
    } catch (error) {
      console.error('회원가입 페이지 실패:', error);
    }
  };

  const closeFailSignupModal = () => {
    setIsFailSignupModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <MainLogo title={'첫 방문을 환영합니다!'} />
      <SignUp onSubmit={handleSignUpSubmit} />
      {isSignupModalOpen && <Modal isOpen={isSignupModalOpen} title="회원 가입" children="가입 완료! 환영합니다." />}
      {isFailSignupModalOpen && <Modal isOpen={isFailSignupModalOpen} onClose={closeFailSignupModal} title="회원 가입" children="이미 사용중인 이메일입니다" />}
    </div>
  );
}
