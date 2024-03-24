'use client';
import { useState } from 'react';

export const useModal = (initialState = false) => {
  // 모달의 열림/닫힘 상태를 관리하는 state
  const [isOpen, setIsOpen] = useState(initialState);

  // 모달을 열기 위한 함수
  const openModal = () => setIsOpen(true);

  // 모달을 닫기 위한 함수
  const closeModal = (e?: any) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  // 상태 및 제어 함수를 포함하는 객체 반환
  return { isOpen, openModal, closeModal };
};
