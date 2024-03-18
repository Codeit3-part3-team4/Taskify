import { useState } from 'react';
import Image from 'next/image';

export default function UserValueInput({ onSubmit, value, type, isValidPw }) {
  const PLACEHOLDER = {
    email: '이메일을 입력해 주세요',
    nickname: '닉네임을 입력해 주세요',
    password: {
      login: '비밀번호를 입력해 주세요',
      signup: '8자 이상 입력해 주세요',
      new: '새 비밀번호 입력',
    },
    pwcheck: {
      check: '비밀번호를 한번 더 입력해 주세요',
      newcheck: '새 비밀번호 입력',
    },
  };

  const TITLE = {
    email: '이메일',
    nickname: '닉네임',
    password: '비밀번호',
    pwcheck: '비밀번호 확인',
  };

  const TYPE = {
    email: 'text',
    nickname: 'text',
    password: 'password',
    pwcheck: 'password',
  };

  const [userValues, setUserValues] = useState({
    email: '',
    nickname: '',
    password: '',
    pwcheck: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    pwcheck: '',
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
      nickname: '',
      password: '',
      pwcheck: '',
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

    if (isValidPw !== userValues.password) {
      newErrors.pwcheck = '비밀번호가 일치하지 않습니다.';
    }
    // console.log(onCheckPassword);
    // console.log(onCheckPassword);
    // console.log('비밀번호는' + isValidPw(userValues.password));

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
          <input
            type={typeValue()}
            id={value}
            value={userValues[value]}
            placeholder={type ? PLACEHOLDER[value][type] : PLACEHOLDER[value]}
            onChange={onChangeSignupSubmit}
            onBlur={onBlur}
          />
          {TYPE[value] === 'password' ? (
            <Image src="/images/password-eyes.svg" alt="비밀번호 표시" width={24} height={24} onClick={handlePasswordLook} />
          ) : null}
          {errors[value] && <div style={{ color: 'red' }}>{errors[value]}</div>}
        </div>
      </form>
    </div>
  );
}
