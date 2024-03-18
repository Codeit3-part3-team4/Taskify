import LoginLink from '@/components/login/LoginLink';
import UserValueInput from '@/components/login/UserValueInput';
import { useState } from 'react';

export default function SignUptest({ onSubmit }) {
  const [newLoginValue, setNewLoginValue] = useState({
    email: '',
    nickname: '',
    password: '',
    pwcheck: '',
  });

  const [isValidPw, setIsValidPw] = useState(true);

  const newEmailSubmit = userValues => {
    setNewLoginValue({
      ...newLoginValue,
      email: userValues,
    });
  };

  const newNicknameSubmit = userValues => {
    setNewLoginValue({
      ...newLoginValue,
      nickname: userValues,
    });
  };

  const newPasswordSubmit = userValues => {
    setNewLoginValue({
      ...newLoginValue,
      password: userValues,
    });
  };

  const newPwcheckSubmit = userValues => {
    setNewLoginValue({
      ...newLoginValue,
      pwcheck: userValues,
    });
    // onCheckPassword();
  };

  console.log(newLoginValue);

  const onCheckPassword = userValues => {
    console.log(newLoginValue.password);
    console.log(newLoginValue.pwcheck);
    if (newLoginValue.password === userValues) {
      setIsValidPw(true);
    } else {
      setIsValidPw(false);
    }
    return isValidPw;
  };

  const onSubmitForm = e => {
    e.preventDefault();
    console.log('회원가입시도 시도:', newLoginValue);
    const singup = onSubmit(newLoginValue);
  };

  return (
    <div>
      <h2>회원가입 테스트</h2>
      <UserValueInput value={'email'} onSubmit={newEmailSubmit} />
      <UserValueInput value={'nickname'} onSubmit={newNicknameSubmit} />
      <UserValueInput value={'password'} type={'signup'} onSubmit={newPasswordSubmit} />
      <UserValueInput value={'pwcheck'} type={'check'} onSubmit={newPwcheckSubmit} isValidPw={onCheckPassword} />
      <button type="click" onClick={onSubmitForm}>
        가입하기
      </button>

      <LoginLink sentence={'이미 가입하셨나요?'} linktitle={'로그인하기'} link={'/login'} />
    </div>
  );
}
