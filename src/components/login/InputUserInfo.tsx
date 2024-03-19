import { ChangeEventHandler } from 'react';
import validateForm from './validateForm';
import Image from 'next/image';

interface Props {
  label: string;
  id: string;
  type: string;
  value: string;
  placeholder: string;
  error: string;
  onChange: ChangeEventHandler;
  onBlur: ChangeEventHandler;
  handlePasswordLook?: ChangeEventHandler;
}

export default function InputUserInfo({ label, id, type, value, placeholder, error, onChange, onBlur, handlePasswordLook }: Props) {
  return (
    <div className="w-519 h-50 top-[574px]">
      <label htmlFor={id}>{label}</label>
      <div className="flex border border-gray-300 rounded-md py-2 focus:outline-violet-5534DA">
        <input type={type} id={id} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur} className="w-full outline-none px-2" />
        {type === 'password' ? <Image src="/images/password-eyes.svg" alt="비밀번호 표시" width={24} height={24} onClick={handlePasswordLook} /> : null}
      </div>

      <div className="text-sm">{error && <div style={{ color: 'red' }}>{error}</div>}</div>
    </div>
  );
}
