import { UserContext } from '@/context/UserContext';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import React from 'react';
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
    setChangePassword({
      ...changePassword,
      [id]: value,
    });
  };

  const onChangePasswordckValues = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setPwCheck(value);
    validateForm(id);
  };

  const validateForm = (id?: 'password' | 'newPassword' | 'newPwCheck' | string): boolean => {
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
    setIsButton(isValid);
    return isValid;
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        await onSubmit(changePassword);
      }
    } catch (error) {}
    setChangePassword({
      password: '',
      newPassword: '',
    });
    setPwCheck('');
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    validateForm(id);
  };

  return (
    <div>
      <div>
        {userInfo && (
          <div className="flex justify-center md:justify-start h-[385px] md:h-[435px] rounded-lg bg-white-FFFFFF mt-3 lg:mt-0 pr-5">
            <div className="flex flex-col ml-3 md:ml-5">
              <h2 className="text-xl mt-6 md:text-2xl font-bold">비밀번호 변경</h2>
              <div className="flex flex-col mt-6 md:mt-8">
                <div className="">
                  <form onSubmit={onSubmitForm}>
                    <div>
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
                    </div>
                    <div className="h-[75px] mt-4 md:mt-5">
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
                    <div className="h-[75px] mt-4 md:mt-5">
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
