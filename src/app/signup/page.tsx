'use client';

import { signupApi } from '@/api/signupApi';
import SignUp from '@/components/login/signup';

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
      <SignUp onSubmit={handleSignUpSubmit} />
    </div>
  );
}
