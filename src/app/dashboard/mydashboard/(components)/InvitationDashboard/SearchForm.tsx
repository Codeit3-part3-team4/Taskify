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
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="대시보드 이름 검색"
      />
      <button type="submit">검색</button>
    </form>
  );
}
