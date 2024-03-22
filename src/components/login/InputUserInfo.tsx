import { ChangeEventHandler, useState } from 'react';
import Image from 'next/image';

interface Props {
  label: string;
  id: string;
  type: string;
  value: string;
  password?: boolean;
  placeholder: string;
  error?: string;
  onChange: ChangeEventHandler;
  onBlur: ChangeEventHandler;
  handlePasswordLook?: ChangeEventHandler;
}

export default function InputUserInfo({ label, id, type, value, password, placeholder, error, onChange, onBlur, handlePasswordLook }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <div className="w-[351px] h-[77px] md:w-[520px] md:h-[77px]">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <div
        className={`flex border border-gray-300 border-solid border-[1px] rounded-lg focus:outline-violet-5534DA mt-1 h-[50px] bg-white ${isFocused && 'border-violet-5534DA'} ${isFocused && onBlur && error ? 'border-red-500' : 'border'}`}
      >
        <input
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleOnBlur}
          onFocus={() => setIsFocused(true)}
          className="w-full outline-none pl-4 bg-transparent"
        />
        {password === true ? (
          <Image src="/images/password-eyes.svg" alt="비밀번호 표시" width={24} height={24} onClick={handlePasswordLook} className="mr-3" />
        ) : null}
      </div>

      <div className="text-sm">{error && <div style={{ color: 'red' }}>{error}</div>}</div>
    </div>
  );
}
