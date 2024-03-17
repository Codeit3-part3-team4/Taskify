import { useState } from 'react';
import Image from 'next/image';

export default function UserValueInput({ onSubmit, value }) {
  const PLACEHOLDER = {
    email: '이메일을 입력해 주세요',
    password: '비밀번호를 입력해 주세요',
  };

  const TITLE = {
    email: '이메일',
    password: '비밀번호',
  };

  const TYPE = {
    email: 'text',
    password: 'password',
  };

  const [userValues, setUserValues] = useState({
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

  const [isValueLook, setIsValueLook] = useState(false);

  const onChangeSignupSubmit = e => {
    const id = e.target.id;
    const value = e.target.value;
    setUserValues({
      ...userValues,
      [id]: value,
    });
    onSubmit(value);
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
    if (!userValues.email || !emailCheck.test(userValues.email)) {
      newErrors.email = '이메일 형식으로 작성해 주세요.';
      isValid = false;
    }

    if (userValues.nickname.length < 1) {
      newErrors.nickname = '닉네임을 입력해 주세요.';
    } else if (userValues.nickname.length > 10) {
      newErrors.nickname = '열 자 이하로 작성해 주세요.';
    }

    if (userValues.password.length < 8) {
      newErrors.password = '8자 이상 입력해 주세요.';
      isValid = false;
    }

    if (userValues.password !== userValues.pwCheck) {
      newErrors.pwCheck = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    console.log(userValues);
    // console.log(validateForm());
    // onSubmit(userValues[value]);

    if (validateForm()) {
      console.log('회원가입 시도:', userValues);
      onSubmit(userValues);
    }
  };

  const onBlur = () => {
    validateForm();
  };

  const typeValue = () => {
    const originType = TYPE[value];
    if (!isValueLook) {
      return originType;
    } else {
      return 'text';
    }
  };

  const handlePasswordLook = () => {
    setIsValueLook(!isValueLook);
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor={value}>{TITLE[value]}</label>
        <div>
          <input type={typeValue()} id={value} value={userValues[value]} placeholder={PLACEHOLDER[value]} onChange={onChangeSignupSubmit} onBlur={onBlur} />
          {value === 'password' ? <Image src="/images/password-eyes.svg" alt="비밀번호 표시" width={24} height={24} onClick={handlePasswordLook} /> : null}
          {errors[value] && <div style={{ color: 'red' }}>{errors[value]}</div>}
        </div>
      </form>
    </div>
  );
}
