import { useState } from 'react';

export default function Login({ onSubmit }) {
  const [userValues, setUserValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const onChangeLoginSubmit = e => {
    const id = e.target.id;
    const value = e.target.value;
    console.log(value);
    setUserValues({
      ...userValues,
      [id]: value,
    });
    console.log(userValues);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userValues.email || !emailCheck.test(userValues.email)) {
      newErrors.email = '이메일 형식으로 작성해 주세요.';
      isValid = false;
    }

    if (userValues.password.length < 8) {
      newErrors.password = '8자 이상 입력해 주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (validateForm()) {
      console.log('로그인 시도:', userValues);
      onSubmit(userValues);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="email">이메일</label>
          <div>
            <input
              type="text"
              id="email"
              value={userValues.email}
              placeholder="이메일을 입력해 주세요"
              onChange={onChangeLoginSubmit}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <div>
            <input
              type="password"
              id="password"
              value={userValues.password}
              placeholder="비밀번호를 입력해 주세요"
              onChange={onChangeLoginSubmit}
            />
            {errors.email && (
              <div style={{ color: 'red' }}>{errors.password}</div>
            )}
          </div>
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
