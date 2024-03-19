import LoginLink from '@/components/login/LoginLink';
import { useState } from 'react';

export default function SignUp({ onSubmit }) {
  const [newUserValues, setNewUserValues] = useState({
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
      ...newUserValues,
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
    if (!newUserValues.email || !emailCheck.test(newUserValues.email)) {
      newErrors.email = '이메일 형식으로 작성해 주세요.';
      isValid = false;
    }

    if (newUserValues.nickname.length < 1) {
      newErrors.nickname = '닉네임을 입력해 주세요.';
    } else if (newUserValues.nickname.length > 10) {
      newErrors.nickname = '열 자 이하로 작성해 주세요.';
      isValid = false;
    }

    if (newUserValues.password.length < 8) {
      newErrors.password = '8자 이상 입력해 주세요.';
      isValid = false;
    }

    if (newUserValues.password !== newUserValues.pwCheck) {
      newErrors.pwCheck = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onBlur = () => {
    validateForm();
    console.log(validateForm);
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    if (validateForm()) {
      console.log('회원가입 시도:', newUserValues);
      onSubmit(newUserValues);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="email">이메일</label>
          <div>
            <input type="text" id="email" value={newUserValues.email} placeholder="이메일을 입력해 주세요" onChange={onChangeSignupSubmit} onBlur={onBlur} />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <div>
            <input
              type="text"
              id="nickname"
              value={newUserValues.nickname}
              placeholder="닉네임을 입력해 주세요"
              onChange={onChangeSignupSubmit}
              onBlur={onBlur}
            />
            {errors.nickname && <div style={{ color: 'red' }}>{errors.nickname}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <div>
            <input
              type="password"
              id="password"
              value={newUserValues.password}
              placeholder="비밀번호를 입력해 주세요"
              onChange={onChangeSignupSubmit}
              onBlur={onBlur}
            />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="pwCheck">비밀번호</label>
          <div>
            <input
              type="password"
              id="pwCheck"
              value={newUserValues.pwCheck}
              placeholder="비밀번호를 한번 더 입력해 주세요"
              onChange={onChangeSignupSubmit}
              onBlur={onBlur}
            />
            {errors.pwCheck && <div style={{ color: 'red' }}>{errors.pwCheck}</div>}
          </div>
        </div>
        <button type="submit">가입하기 </button>
      </form>
      <LoginLink sentence={'이미 가입하셨나요?'} linktitle={'로그인하기'} link={'/login'} />
    </div>
  );
}
