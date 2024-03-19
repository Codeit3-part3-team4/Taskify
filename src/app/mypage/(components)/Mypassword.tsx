import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputUserInfo from '@/components/login/InputUserInfo';

const Mypassword: React.FC = ({ onSubmit }) => {
  const { data: userInfo } = useContext(UserContext);

  const [changePassword, setChangePassword] = useState({
    password: '',
    newPassword: '',
    newPwcheck: '',
  });

  const onChangePasswordValues = e => {
    const id = e.target.id;
    const value = e.target.value;
    setChangePassword({
      ...changePassword,
      [id]: value,
    });
    console.log(changePassword);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(changePassword);
    console.log('업뎃:' + changePassword);
  };

  return (
    <div>
      <div>
        {userInfo && (
          <div>
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
                    value={changePassword.newPwcheck}
                    placeholder={'새 비밀번호 입력'}
                    onChange={onChangePasswordValues}
                  />
                </div>
              </form>
              <button onSubmit={onSubmitForm}>변경</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mypassword;
