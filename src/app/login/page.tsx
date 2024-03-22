'use client';

import { loginApi, postRequestCookies } from '@/api/AuthApi';
import MainLogo from '@/components/login/MainLogo';
import { useRouter } from 'next/navigation';
import { authInstance } from '@/utils/functionalFetch';
import Login from './(components)/Login';

export default function LoginPage() {
  const router = useRouter();
  const handleLoginSubmit = async userValues => {
    const res = await loginApi(userValues);
    console.log('로그인페이지 시도:' + res);

    if (res && res.accessToken) {
      authInstance.setOptions({
        headers: {
          Authorization: `Bearer ${res.accessToken}`,
        },
      });
      postRequestCookies('accessToken', res.accessToken);
      router.push('/dashboard/mydashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black">
      <MainLogo title={'오늘도 만나서 반가워요!'} />
      <Login onSubmit={handleLoginSubmit} />
    </div>
  );
}
