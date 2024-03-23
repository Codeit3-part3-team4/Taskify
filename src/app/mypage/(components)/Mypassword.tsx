import { UserContext } from '@/context/UserContext';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputUserInfo from '@/components/login/InputUserInfo';
import { MyPasswordValue } from '../page';

interface Error {
  password?: string;
  newPassword?: string;
  newPwCheck?: string;
}

interface MyPasswordProps {
  onSubmit: (valeu: MyPasswordValue) => void;
}

const MyPassword: React.FC<MyPasswordProps> = ({ onSubmit }) => {
  const { data: userInfo } = useContext(UserContext);

  const [changePassword, setChangePassword] = useState({
    password: '',
    newPassword: '',
  });

  const [newPwCheck, setPwCheck] = useState('');
  const [isButton, setIsButton] = useState<boolean>(false);

  const [errors, setErrors] = useState<Error>({
    password: '',
    newPassword: '',
    newPwCheck: '',
  });

  const onChangePasswordValues = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    console.log('id : ' + id);
    console.log('value :' + value);
    setChangePassword({
      ...changePassword,
      [id]: value,
    });
    console.log(changePassword);
    // validateForm(id);
  };

  const onChangePasswordckValues = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setPwCheck(value);
    console.log(newPwCheck);
    validateForm(id);
  };

  const validateForm = (id?: 'password' | 'newPassword' | 'newPwCheck' | string): boolean => {
    console.log('idididid', id);
    let isValid = true;
    const newErrors: Error = {
      password: '',
      newPassword: '',
      newPwCheck: '',
    };

    if (changePassword.password.length < 8) {
      isValid = false;
    }

    if (changePassword.newPassword.length < 8) {
      newErrors.newPassword = '8자 이상 입력해 주세요.';
      isValid = false;
    }

    if (changePassword.newPassword !== newPwCheck) {
      newErrors.newPwCheck = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    if (id === 'password' || id === 'newPassword' || id === 'newPwCheck') {
      setErrors({
        ...errors,
        [id]: newErrors[id],
      });
    }
    console.log('이프문 에러', id);
    console.log('이프문 newPassword에러', errors.newPassword);
    console.log('이프문 newPwcheck에러', errors.newPwCheck);
    console.log('이프문 에러', errors.newPassword);

    setIsButton(isValid);
    // setErrors(newErrors);
    return isValid;
  };

  const onSubmitForm = async (e: FormEvent) => {
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

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    validateForm(id);
  };

  return (
    <div>
      <div>
        {userInfo && (
          <div className="flex justify-center md:justify-start h-[385px] md:h-[454px] rounded-lg bg-white-FFFFFF mt-3">
            <div className="flex flex-col  md:ml-8">
              <h2 className="text-xl md:text-2xl font-bold">비밀번호 변경</h2>
              <div className="flex flex-col mt-6 md:mt-8">
                <div className="">
                  <form onSubmit={onSubmitForm}>
                    <label htmlFor="password" className="font-semibold">
                      현재 비밀번호
                    </label>
                    <div>
                      <input
                        type="password"
                        id="password"
                        value={changePassword.password}
                        placeholder={'현재 비밀번호 입력'}
                        onChange={onChangePasswordValues}
                        className="w-[244px] md:w-[488px] lg:w-[564px] h-[42px] md:h-[48px] lg:h-[48px] mt-[10px] border-solid border-[1px] rounded-md text-sm md:text-base pl-4"
                      />
                    </div>
                    <div className="mt-4 md:mt-5">
                      <label htmlFor="newPassword" className="font-semibold">
                        새 비밀번호
                      </label>
                      <div>
                        <input
                          type="password"
                          id="newPassword"
                          value={changePassword.newPassword}
                          placeholder={'새 비밀번호 입력'}
                          onChange={onChangePasswordValues}
                          onBlur={onBlur}
                          className="w-[244px] md:w-[488px] lg:w-[564px] h-[42px] md:h-[48px] lg:h-[48px] mt-[10px] border-solid border-[1px] rounded-md text-sm md:text-base pl-4"
                        />
                        <div className="text-sm">{errors.newPassword && <div style={{ color: 'red' }}>{errors.newPassword}</div>} </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-5">
                      <label htmlFor="newPwCheck" className="font-semibold">
                        새 비밀번호 확인
                      </label>
                      <div>
                        <input
                          type="password"
                          id="newPwCheck"
                          value={newPwCheck}
                          placeholder={'새 비밀번호 입력'}
                          onChange={onChangePasswordckValues}
                          onBlur={onBlur}
                          className="w-[244px] md:w-[488px] lg:w-[564px] h-[42px] md:h-[48px] lg:h-[48px] mt-[10px] border-solid border-[1px] rounded-md text-sm md:text-base pl-4"
                        />
                        <div className="text-sm">{errors.newPwCheck && <div style={{ color: 'red' }}>{errors.newPwCheck}</div>} </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={onSubmitForm}
                    disabled={!isButton}
                    className={`text-white w-[84px] h-[28px] md:h-[32px] rounded mt-4 md:mt-6 ${isButton ? 'bg-primary-BASIC  hover:scale-105' : 'bg-gray-400'}`}
                  >
                    변경
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPassword;
