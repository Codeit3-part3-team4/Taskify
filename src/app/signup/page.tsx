'use client';

import SignUp from '@/components/login/signup';

// import { loginApi } from '@/api/loginApi';
// import Login from '@/components/login/login';

export default function SignUpPage() {
  // const handleLoginSubmit = async userValues => {
  //   try {
  //     await loginApi(userValues);
  //   } catch (error) {
  //     console.error('로그인 페이지 실패:', error);
  //   }
  // };

  return (
    <div>
      <SignUp />
    </div>
  );
}
