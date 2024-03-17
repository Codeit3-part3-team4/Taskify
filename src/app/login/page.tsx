'use client';

import { loginApi } from '@/api/loginApi';
import MainLogo from '@/components/login/MainLogo';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Login from './components/Login';

export default function LoginPage() {
  const router = useRouter();
  const handleLoginSubmit = async userValues => {
    try {
      const res = await loginApi(userValues);
      console.log('로그인페이지 시도:' + res);
      if (res.ok) {
        router.push('/mydashboard');
      }
    } catch (error) {
      console.error('로그인 페이지 실패:', error);
    }
  };

  return (
    <div>
      <MainLogo title={'오늘도 만나서 반가워요!'} />
      <Login onSubmit={handleLoginSubmit} />
    </div>
  );
}
