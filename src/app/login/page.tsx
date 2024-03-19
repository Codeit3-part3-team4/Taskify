'use client';

import { loginApi, postRequestCookies } from '@/api/authApi';
import MainLogo from '@/components/login/MainLogo';
import { useRouter } from 'next/navigation';
import Login from './components/Login';
import { cookies } from 'next/headers';

export default function LoginPage() {
  const router = useRouter();
  const handleLoginSubmit = async userValues => {
    try {
      const res = await loginApi(userValues);
      console.log('로그인페이지 시도:' + res);
      if (res) {
        postRequestCookies('accessToken', res.accessToken).then(() => {
          router.push('dashboard/mydashboard');
        });
      }
    } catch (error) {
      console.error('로그인 페이지 실패:', error);
    }
  };

  return (
    <div>
      <MainLogo title={'오늘도 만나서 반가워요!'}/>
      <Login onSubmit={handleLoginSubmit} />
    </div>
  );
}
