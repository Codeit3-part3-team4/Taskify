import InputUserInfo from '@/components/login/InputUserInfo';
import LoginLink from '@/components/login/LoginLink';
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
    <div className="flex flex-col items-center t-[574px] ">
      <form onSubmit={onSubmitForm}>
        <div>
          <InputUserInfo
            label={'이메일'}
            id={'email'}
            type={'text'}
            value={userValues.email}
            placeholder={'이메일을 입력해 주세요'}
            onChange={onChangeLoginSubmit}
            onBlur={onBlur}
            error={errors.email}
          />
        </div>
        <div>
          <InputUserInfo
            label={'비밀번호'}
            id={'password'}
            type={typeValue()}
            value={userValues.password}
            password={true}
            placeholder={'비밀번호를 입력해 주세요'}
            onChange={onChangeLoginSubmit}
            onBlur={onBlur}
            handlePasswordLook={handlePasswordLook}
            error={errors.password}
          />
        </div>
        <button type="submit" onClick={onSubmitForm} className="rounded-[8px] w-full py-3 overflow-hidden border text-white bg-gray-400 top-[764px] ">
          로그인
        </button>
      </form>
      <LoginLink sentence={'회원이 아니신가요?'} linktitle={'회원 가입하기'} link={'/signup'} />
    </div>
  );
}
