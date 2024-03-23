import React, { useCallback, useState } from 'react';

interface SearchFormProps {
  onSubmit: (value: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [inputValue, setInputValue] = useState('');

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(debounce(onSubmit, 1000), []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    onSubmit(trimmedValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // 검색 함수 호출
    debouncedSearch(inputValue);
  };
  return (
    <form className="flex" onSubmit={handleSubmit}>
      <img className="ml-1 w-5" src="/images/search-icon.svg" alt="찾기 아이콘" />
      <input className="focus:outline-none h-9 w-full" type="text" value={inputValue} onChange={handleInputChange} placeholder="대시보드 이름 검색" />
    </form>
  );
}
