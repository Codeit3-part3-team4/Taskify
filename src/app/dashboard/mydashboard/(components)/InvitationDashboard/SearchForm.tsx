import React, { useEffect, useState } from 'react';

interface SearchFormProps {
  onSubmit: (value: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [query, setQuery] = useState('');

  // 입력 값이 변경될 때마다 타이머 설정
  useEffect(() => {
    const delayDebounceTimer = setTimeout(() => {
      onSubmit(query);
    }, 1000); // 1s 디바운스 지연 시간
    // 이전에 설정한 타이머를 클리어하여 디바운스 취소
    return () => clearTimeout(delayDebounceTimer);
  }, [query]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <img className="ml-1 w-5" src="/images/search-icon.svg" alt="찾기 아이콘" />
      <input className="focus:outline-none h-9 w-full" type="text" value={query} onChange={handleInputChange} placeholder="대시보드 이름 검색" />
    </form>
  );
}
