import InputUserInfo from '@/components/login/InputUserInfo';
import LoginLink from '@/components/login/LoginLink';
import { useState } from 'react';

export interface Login {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (UserValues: Login) => void;
}

export default function Login({ onSubmit }: Props) {
  const [userValues, setUserValues] = useState<Login>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Login>({
    email: '',
    password: '',
  });

  const [isValueLook, setIsValueLook] = useState<boolean>(false);
  const [isButton, setIsButton] = useState<boolean>(false);

  const onChangeLoginSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setUserValues({
      ...userValues,
      [id]: value,
    });
    validateForm(id);
  };

  const validateForm = (id: 'email' | 'password' | string): boolean => {
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

    if (id === 'email') {
      setErrors({
        ...errors,
        email: newErrors.email,
      });
    } else if (id === 'password') {
      setErrors({
        ...errors,
        password: newErrors.password,
      });
    }

    setIsButton(isValid);
    return isValid;
  };

  const onSubmitForm = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(userValues);
  };

  const onBlur = (id: 'email' | 'password'): void => {
    validateForm(id);
  };

  const handlePasswordLook = (): void => {
    setIsValueLook(!isValueLook);
  };

  const typeValue = (): string => {
    if (!isValueLook) {
      return 'password';
    } else {
      return 'text';
    }
  };

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
            onBlur={() => onBlur('password')}
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
