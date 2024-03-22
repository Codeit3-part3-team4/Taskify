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
    validateForm();
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

  const onBlur = () => {
    validateForm();
  };

  return (
    <div>
      <div>
        {userInfo && (
          <div id="비밀번호 컨테이너" className="flex justify-center items-center h-[422px] md:h-[385px] rounded-lg bg-white-FFFFFF mt-3">
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold">비밀번호 변경</h2>
              <div id="프로필이미지+이메일+닉넴" className="flex flex-col md:flex-row mt-6 md:mt-8">
                <form onSubmit={onSubmitForm}>
                  <div className="">
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
                      onBlur={onBlur}
                    />
                  </div>
                </form>
                <button onClick={onSubmitForm} className="bg-primary-BASIC text-white w-[84px] h-[28px] md:h-[32px] rounded mt-4">
                  변경
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPassword;
