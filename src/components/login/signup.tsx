import { useState } from 'react';

export default function SignUp() {
  const [NewUserValues, setNewUserValues] = useState({
    email: '',
    password: '',
    nickname: '',
    pwCheck: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    nickname: '',
    pwCheck: '',
  });

  const onChangeSignupSubmit = e => {
    const id = e.target.id;
    const value = e.target.value;
    setNewUserValues({
      ...NewUserValues,
      [id]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      nickname: '',
      pwCheck: '',
    };

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!NewUserValues.email || !emailCheck.test(NewUserValues.email)) {
      newErrors.email = '이메일 형식으로 작성해 주세요.';
      isValid = false;
    }

    if (NewUserValues.password.length < 8) {
      newErrors.password = '8자 이상 입력해 주세요.';
      isValid = false;
    }

    if (NewUserValues.password !== NewUserValues.pwCheck) {
      newErrors.pwCheck = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch(`${BASE_URL}/3-4/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(NewUserValues),
        });

        if (!res.ok) {
          throw new Error('회원가입 실패');
        }

        const data = await res.json();
        console.log('회원가입 성공:', data);
      } catch (error) {
        console.error('회원가입 에러:', error);
      }
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="email">이메일</label>
          <div>
            <input
              type="text"
              id="email"
              value={NewUserValues.email}
              placeholder="이메일을 입력해 주세요"
              onChange={onChangeSignupSubmit}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <div>
            <input
              type="text"
              id="nickname"
              value={NewUserValues.nickname}
              placeholder="닉네임을 입력해 주세요"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <div>
            <input
              type="password"
              id="password"
              value={NewUserValues.password}
              placeholder="비밀번호를 입력해 주세요"
              onChange={onChangeSignupSubmit}
            />
            {errors.password && (
              <div style={{ color: 'red' }}>{errors.password}</div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="pwCheck">비밀번호</label>
          <div>
            <input
              type="password"
              id="pwCheck"
              value={NewUserValues.pwCheck}
              placeholder="비밀번호를 한번 더 입력해 주세요"
              onChange={onChangeSignupSubmit}
            />
            {errors.pwCheck && (
              <div style={{ color: 'red' }}>{errors.pwCheck}</div>
            )}
          </div>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
