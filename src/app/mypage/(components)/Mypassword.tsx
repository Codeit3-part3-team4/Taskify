import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputUserInfo from '@/components/login/InputUserInfo';

const MyPassword: React.FC = ({ onSubmit }) => {
  const { data: userInfo } = useContext(UserContext);

  const [changePassword, setChangePassword] = useState({
    password: '',
    newPassword: '',
  });

  const [newPwcheck, setPwCheck] = useState('');

  const [errors, setErrors] = useState({
    password: '',
    newPassword: '',
    newPwCheck: '',
  });

  const onChangePasswordValues = e => {
    const id = e.target.id;
    const value = e.target.value;
    console.log('id : ' + id);
    console.log('value :' + value);
    setChangePassword({
      ...changePassword,
      [id]: value,
    });
    console.log(changePassword);
  };

  const onChangePasswordckValues = e => {
    const value = e.target.value;
    setPwCheck(value);
    console.log(newPwcheck);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      password: '',
      newPassword: '',
      newPwcheck: '',
    };

    if (changePassword.newPassword.length < 8) {
      newErrors.newPassword = '8자 이상 입력해 주세요.';
      isValid = false;
    }

    if (changePassword.newPassword !== newPwcheck) {
      newErrors.newPwcheck = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const validateCurrentPassword = async () => {
  //   try {
  //     const res = await checkCurrentPassword(changePassword.password);
  //     return res.isValid;
  //   } catch (error) {
  //     console.error('비밀번호 유효성 검사 실패', error);
  //     return false;
  //   }
  // };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      if (validateForm()) {
        console.log('비밀번호 업뎃:', changePassword);
        await onSubmit(changePassword);
      }
    } catch (error) {
      console.error('비밀번호 업뎃 실패:', error);
    }
  };

  // const checkCurrentPassword = async password => {
  //   const res = await fetch(`${BASE_URL}/3-4/auth/password`, {
  //     method: 'POST',
  //     body: JSON.stringify({ password }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (!res.ok) {
  //     throw new Error('비밀번호 유효성 검사 실패');
  //   }
  //   return res.json();
  // };

  return (
    <div>
      <div>
        {userInfo && (
          <div>
            <h2>비밀번호 변경</h2>
            <form onSubmit={onSubmitForm}>
              <div>
                <InputUserInfo
                  label={'현재 비밀번호'}
                  id={'password'}
                  type={'password'}
                  value={changePassword.password}
                  placeholder={'현재 비밀번호 입력'}
                  onChange={onChangePasswordValues}
                />
              </div>
              <div>
                <InputUserInfo
                  label={'새 비밀번호'}
                  id={'newPassword'}
                  type={'password'}
                  value={changePassword.newPassword}
                  placeholder={'새 비밀번호 입력'}
                  onChange={onChangePasswordValues}
                />
              </div>
              <div>
                <InputUserInfo
                  label={'새 비밀번호 확인'}
                  id={'newPwcheck'}
                  type={'password'}
                  value={newPwcheck}
                  placeholder={'새 비밀번호 입력'}
                  onChange={onChangePasswordckValues}
                  error={errors.newPwcheck}
                />
              </div>
            </form>
            <button onClick={onSubmitForm}>변경</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPassword;