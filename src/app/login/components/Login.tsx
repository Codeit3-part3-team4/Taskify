import LoginLink from '@/components/login/LoginLink';
import Image from 'next/image';
import Link from 'next/link';
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

  const [isValueLook, setIsValueLook] = useState(false);

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
    console.log('로그인 시도:', userValues);
    onSubmit(userValues);
    if (validateForm()) {
      console.log('로그인 시도:', userValues);
      onSubmit(userValues);
    }
  };

  const onBlur = () => {
    validateForm();
  };

  const handlePasswordLook = () => {
    setIsValueLook(!isValueLook);
  };

  const typeValue = () => {
    if (!isValueLook) {
      return 'password';
    } else {
      return 'text';
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <div flex>
          <label htmlFor="email">이메일</label>
          <div>
            <input type="text" id="email" value={userValues.email} placeholder="이메일을 입력해 주세요" onChange={onChangeLoginSubmit} onBlur={onBlur} />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <div>
            <input type={typeValue()} id="password" value={userValues.password} placeholder="비밀번호를 입력해 주세요" onChange={onChangeLoginSubmit} />
            <Image src="/images/password-eyes.svg" alt="비밀번호 표시" width={24} height={24} onClick={handlePasswordLook} />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          </div>
        </div>
        <button type="submit" onClick={onSubmitForm}>
          로그인
        </button>
      </form>
      <LoginLink sentence={'회원이 아니신가요?'} linktitle={'회원 가입하기'} link={'/signup'} />
    </div>
  );
}
