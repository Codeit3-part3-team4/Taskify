import { UserSignUp } from '@/api/userApi';
import InputUserInfo from '@/components/login/InputUserInfo';
import LoginLink from '@/components/login/LoginLink';
import { useState } from 'react';

interface SignUpProps {
  onSubmit: (newUserValues: UserSignUp) => Promise<void>;
}

export default function SignUp({ onSubmit }: SignUpProps) {
  const [newUserValues, setNewUserValues] = useState<UserSignUp>({
    email: '',
    password: '',
    nickname: '',
    pwCheck: '',
  });

  const [errors, setErrors] = useState<UserSignUp>({
    email: '',
    password: '',
    nickname: '',
    pwCheck: '',
  });

  const [isValueLook, setIsValueLook] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isButton, setIsButton] = useState<boolean>(false);

  const onChangeSignupSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof UserSignUp;
    const value = e.target.value;
    setNewUserValues({
      ...newUserValues,
      [id]: value,
    });
    console.log(newUserValues);
    validateForm(id);
  };

  const validateForm = (id: string): boolean => {
    let isValid = true;
    const newErrors: UserSignUp = {
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

    if (id) {
      setErrors({
        ...errors,
        [id]: newErrors[id],
      });
    }

    setIsButton(isValid);
    return isValid && isAgreed;
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 시도:', newUserValues);
    onSubmit(newUserValues);
  };

  const onBlur = (id: string): void => {
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

  const handleAgreedChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <div className="flex flex-col items-center t-[574px] ">
      <form onSubmit={onSubmitForm}>
        <div className="mt-[50px] md:mt-[38px]">
          <InputUserInfo
            label={'이메일'}
            id={'email'}
            type={'text'}
            value={newUserValues.email}
            placeholder={'이메일을 입력해 주세요'}
            onChange={onChangeSignupSubmit}
            onBlur={() => onBlur('email')}
            error={errors.email}
          />
        </div>
        <div className="mt-4">
          <InputUserInfo
            label={'닉네임'}
            id={'nickname'}
            type={'text'}
            value={newUserValues.nickname}
            placeholder={'닉네임을 입력해 주세요'}
            onChange={onChangeSignupSubmit}
            onBlur={() => onBlur('nickname')}
            error={errors.nickname}
          />
        </div>
        <div className="mt-4">
          <InputUserInfo
            label={'비밀번호'}
            id={'password'}
            type={typeValue()}
            value={newUserValues.password}
            password={true}
            placeholder={'8자 이상 입력해 주세요'}
            onChange={onChangeSignupSubmit}
            onBlur={() => onBlur('password')}
            handlePasswordLook={handlePasswordLook}
            error={errors.password}
          />
        </div>
        <div className="mt-4">
          <InputUserInfo
            label={'비밀번호 확인'}
            id={'pwCheck'}
            type={typeValue()}
            value={newUserValues.pwCheck}
            password={true}
            placeholder={'비밀번호를 한번 더 입력해 주세요'}
            onChange={onChangeSignupSubmit}
            onBlur={() => onBlur('pwCheck')}
            handlePasswordLook={handlePasswordLook}
            error={errors.pwCheck}
          />
        </div>
        <div className="mt-6">
          <label>
            <input type="checkbox" onChange={handleAgreedChange} checked={isAgreed} className="w-5" />
            <span className="text-base font-normal leading-[19px]">이용약관에 동의합니다.</span>
          </label>
        </div>

        <button
          type="submit"
          onClick={onSubmitForm}
          disabled={!isButton || !isAgreed}
          className={`rounded-[8px] w-full h-[50px] py-3 overflow-hidden  text-white top-[764px] mt-5 mb-6 ${isButton && isAgreed ? 'bg-primary-BASIC' : 'bg-gray-400'}`}
        >
          가입하기
        </button>
      </form>
      <LoginLink sentence={'이미 가입하셨나요?'} linktitle={'로그인하기'} link={'/login'} />
    </div>
  );
}
