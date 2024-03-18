'use client';

import { signupApi } from '@/api/userApi';
import SignUp from './components/Signup';
import SignUptest from './components/Signuptest';
import MainLogo from '@/components/login/MainLogo';

export default function SignUpPage() {
  const handleSignUpSubmit = async newUserValues => {
    try {
      await signupApi(newUserValues);
    } catch (error) {
      console.error('회원가입 페이지 실패:', error);
    }
  };

  return (
    <div>
      <MainLogo title={'첫 방문을 환영합니다!'} />
      {/* <SignUp onSubmit={handleSignUpSubmit} /> */}
      <SignUptest onSubmit={handleSignUpSubmit} />
    </div>
  );
}
