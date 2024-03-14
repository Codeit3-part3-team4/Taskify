'use client';

import { loginApi } from '@/api/loginApi';
import Login from './components/login';
import MainLogo from '@/components/login/MainLogo';

export default function LoginPage() {
  const handleLoginSubmit = async userValues => {
    try {
      await loginApi(userValues);
    } catch (error) {
      console.error('로그인 페이지 실패:', error);
    }
  };

  return (
    <div>
      <MainLogo />
      <Login onSubmit={handleLoginSubmit} />
    </div>
  );
}
