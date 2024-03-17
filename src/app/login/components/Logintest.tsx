import UserValueInput from '@/components/login/UserValueInput';
import { useState } from 'react';

export default function Logintest({ onSubmit }) {
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: '',
  });

  const emailSubmit = userValues => {
    setLoginValue({
      ...loginValue,
      email: userValues,
    });
    console.log(loginValue);
  };

  const passwordSubmit = userValues => {
    setLoginValue({
      ...loginValue,
      password: userValues,
    });
    console.log(loginValue);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    console.log('로그인 시도:', loginValue);
    onSubmit(loginValue);
    if (validateForm()) {
    }
  };

  return (
    <div>
      <h2>로그인 테스트</h2>

      <UserValueInput value={'email'} onSubmit={emailSubmit} />
      <UserValueInput value={'password'} onSubmit={passwordSubmit} />

      <button type="click" onClick={onSubmitForm}>
        로그인
      </button>

      <div>회원이 아니신가요? 회원 가입하기</div>
    </div>
  );
}