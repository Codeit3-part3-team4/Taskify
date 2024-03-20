import React, { useState } from 'react';

interface SearchFormProps {
  onSubmit: (value: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    onSubmit(trimmedValue);
    console.log(trimmedValue);
  };

  return (
    <form className="flex border border-gray-D9D9D9 rounded-md" onSubmit={handleSubmit}>
      <img className="ml-1 w-5" src="/images/search-icon.svg" alt="찾기 아이콘" />
      <input className="focus:outline-none h-9 w-full" type="text" value={inputValue} onChange={handleInputChange} placeholder="대시보드 이름 검색" />
    </form>
  );
}
