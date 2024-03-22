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
  const [isButton, setIsButton] = useState(false);

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
    setIsButton(isValid);
    console.log('유효성검사중 isbutton:', isButton);
    return isValid;
  };

  const onSubmitForm = e => {
    e.preventDefault();
    console.log('로그인 시도:', userValues);
    onSubmit(userValues);
  };

  const onBlur = id => {
    validateForm();
    if (id === 'email' || id === 'password') {
      setErrors({
        ...errors,
        [id]: errors[id],
      });
    }
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

  // const handleButton = () => {
  //   console.log('유효성 검사 후 이즈버튼값', isButton);
  //   if (isButton) {
  //     onSubmitForm();
  //     console.log('유효성 검사 성공. 버튼 활성화');
  //   } else {
  //     console.log('유효성 검사 실패. 버튼 비활성화');
  //   }
  // };

  return (
    <div className="flex flex-col items-center ">
      <form onSubmit={onSubmitForm}>
        <div className="mt-[40px] md:mt-[60px] lg:mt-[38px]">
          <InputUserInfo
            label={'이메일'}
            id={'email'}
            type={'text'}
            value={userValues.email}
            placeholder={'이메일을 입력해 주세요'}
            onChange={onChangeLoginSubmit}
            onBlur={() => onBlur('email')}
            error={errors.email}
          />
        </div>
        <div className="mt-4">
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
        <button
          type="submit"
          onClick={onSubmitForm}
          disabled={!isButton}
          className={`rounded-[8px] w-full h-[50px] py-3 overflow-hidden  text-white top-[764px] mt-5 mb-6 ${isButton ? 'bg-primary-BASIC' : 'bg-gray-400'}`}
        >
          로그인
        </button>
      </form>
      <LoginLink sentence={'회원이 아니신가요?'} linktitle={'회원 가입하기'} link={'/signup'} />
    </div>
  );
}
