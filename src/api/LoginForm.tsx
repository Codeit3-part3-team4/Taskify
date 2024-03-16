// LoginForm.js
import React, { useState } from 'react';
import login from './login'; // login 함수 임포트

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    const token = await login(email, password); // 로그인 함수 호출
    // token을 상태 관리 라이브러리에 저장하거나, 다른 API 호출에 사용
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
